---
title: "Prompt"
aliases: []
type: reference
status: active
domain: ai-machine-learning
tags: [reference, ai-machine-learning]
created: 2026-09-21
updated: 2026-11-02
source:
related: []
---

I need a complete overhaul of the scraping/export system covering source control, manual refresh with cooldown, a fix for the frozen job count, flexible export depth, and source health visibility. Build all of this as one connected feature set. Investigate the real, current code at every step before changing anything — do not assume prior features exist; verify what's actually in the codebase right now, since nothing described below has been implemented yet.

## PART 0 — Investigation first
Before writing any code, read and report on:
- `worker/index.ts` (current `runScrapeCycle` / `startWorker` logic)
- `packages/config/config.js`, `packages/config/profiles.js`, `packages/sources/registry.js` (how `buildScrapers`/`SOURCES` work, and how to enable/disable a source or limit its `maxPages`)
- `lib/db.ts` (the `dbBridge` pattern used to talk to Prisma)
- `prisma/schema.prisma` (existing models, ID/timestamp conventions, DB provider — SQLite vs Postgres, since this affects what field types are available)
- `apps/cli/export.js` (current export logic and how/if it's exposed to the web UI at all)
- The dashboard's main page under `app/` (current UI structure, existing components/patterns to reuse — buttons, modals, cards)
Report a short summary of all of this before proceeding.

## PART 1 — Diagnose and fix the frozen job count (~41, never changes)
1. Check Railway Worker Service **Deploy Logs** for recent cycles — confirm whether `runScrapeCycle` is firing every ~30 min, and specifically whether the `Found=X, Relevant=Y, Saved=Z` numbers logged each cycle are real (`Found > 0`) or stuck at zero.
2. Get ground truth directly from the production database (via an existing script pattern or a simple one-off query) — check actual row count and the `createdAt` timestamp of the most recent jobs. If nothing recent exists despite logs claiming completed cycles, persistence is broken somewhere between scraping and saving.
3. Investigate the likely causes, in order of likelihood:
   - Any existing "enabled sources" filtering logic defaulting to an empty/no-sources set instead of "all enabled" when no settings exist yet (fail-closed bug) — if this exists at all yet, check it; if it doesn't exist yet, this isn't the cause and move on.
   - Deduplication logic in `packages/core/deduplicator.js` / fingerprinting in `packages/core/fingerprint.js` being too aggressive, flagging genuinely new postings as duplicates of old ones.
   - Any seed/fixture data — check if the 41 jobs currently in the DB were inserted via a seed script (`prisma/seed.*` or similar) rather than genuinely scraped, and if the live scrape path is entirely disconnected from what actually populates the table the dashboard reads from (e.g. writing to the wrong table, wrong DB connection string pointing at a different/local DB than production).
   - Any error being silently caught and swallowed in `crawlAll` or per-source scraper try/catch blocks that would make `Found=0` look like a "successful" cycle in logs without surfacing the real failure reason.
4. Fix whatever the actual root cause is. Add clear error logging at each stage (fetch → parse → dedup → save) if it's currently too silent to diagnose quickly in the future.
5. **Prove it's fixed, don't just assume:** after deploying, wait for or manually trigger a cycle (using the manual trigger built in Part 2 below), and report the actual before/after job count and the `createdAt` timestamps of newly added rows, confirming the number is no longer frozen at 41.

## PART 2 — User-controlled source selection
1. Add a settings mechanism (new Prisma model, e.g. `SourceSettings`, or extend an existing one if found in Part 0) storing which source keys are currently enabled/disabled. Default: all sources enabled if no explicit setting exists yet (fail-open).
2. Add a web UI section (in the dashboard, a settings panel or dedicated `/settings` area — fit it into the existing layout/navigation found in Part 0) with a toggle per source, driven from the real `SOURCES` list in `packages/sources/registry.js` (don't hardcode a separate list).
3. Add an API route to read/update enabled sources, validating against real known source keys.
4. In `runScrapeCycle`, filter which scrapers actually run based on the currently enabled sources — for every scrape (both the regular 30-min cycle and the manual/export-triggered ones in Parts 3 and 5).

## PART 3 — Manual immediate refresh with a 30-minute cooldown
1. Add a "تحديث الآن" / "Refresh now" button in the dashboard UI.
2. When clicked, it should trigger an immediate scrape cycle using a **shallow depth — just 1 page per enabled source** (fast, "just enough to catch what's newly listed on each site right now" — not a deep pull), respecting the currently enabled sources from Part 2.
3. Track the timestamp of the last manual trigger (store in the DB, e.g. a `lastManualTriggerAt` field on the settings model or a small separate table).
4. If the user clicks "Refresh now" again within 30 minutes of the last manual trigger (or the last completed cycle in general — decide based on what makes more sense: cooldown from last trigger request, or from last actual completed cycle, and go with **last completed cycle** since that reflects real data freshness), do NOT start a new scrape. Instead, respond with a clear message: "سيتم تحديث المحتوى تلقائيًا خلال [X دقيقة]" (show the actual remaining minutes until the next update, either from the next scheduled 30-min cron tick or 30 minutes since the last completed cycle, whichever is sooner).
5. Reuse the same `isRunning` concurrency guard pattern (add one if it doesn't exist yet per Part 0's findings) so a manual trigger never runs concurrently with the cron cycle or another manual trigger — if one is already in progress, the new request should just report that a refresh is currently underway rather than queueing a duplicate.
6. Implementation mechanism for triggering the worker from the web app: check Part 0's findings for whether the web app and worker share a DB (likely yes) — use the same DB-flag-plus-polling approach (web app sets a `pendingTrigger` flag + depth parameter in the DB, worker's cron loop also runs a lightweight `setInterval` poll every ~5 seconds checking for pending triggers) so the web app doesn't need direct network access to the worker service.

## PART 4 — Source health visibility
1. In the DB, track per-source status after every cycle: last successful fetch time, last error (if any), and a healthy/degraded/error status — check if `dbBridge.updateSourceStatus` (seen previously in `runScrapeCycle`) already does something like this; if so, build on it rather than duplicating.
2. Surface this in the same settings/sources UI panel from Part 2 — next to each source's enable/disable toggle, show a small status indicator (e.g. green "متاح" / yellow "به مشكلة جزئية" / red "متوقف حاليًا") based on that source's last recorded status, plus the last successful fetch time, so users can see at a glance which sources are currently working before deciding whether to enable them.

## PART 5 — Flexible export depth (scrape-then-export in one action)
1. Find or build a web UI entry point for export (button in the dashboard — "تصدير Excel" — since Part 0 will reveal whether this currently only exists as a CLI script).
2. When clicked, show a small choice UI (reuse existing modal/dialog patterns) letting the user pick a scrape depth before export — e.g. "صفحة واحدة" / "صفحتين" / "3 صفحات" or more, mapped to a `maxPages` value applied to all enabled sources for this one operation.
3. On confirm: trigger a fresh scrape at the chosen depth (respecting currently enabled sources from Part 2, and respecting/waiting for the `isRunning` guard if a cycle is already in progress — with a reasonable timeout, e.g. 3-5 minutes, after which it fails gracefully rather than hanging), show a loading state ("جاري تحديث الوظائف قبل التصدير..."), and only once that scrape cycle completes, immediately generate and return the export file using the now-freshly-scraped data — so export is always "scrape at the chosen depth, then export the result" as a single combined action, never exporting stale/old data.
4. This deep export-triggered scrape should NOT interfere with or reset the 30-minute cooldown tracked in Part 3 for the manual "Refresh now" button — they're separate actions (though both should still respect the same `isRunning` guard so they never literally run at the same time).

## PART 6 — Verify and ship
1. Run `npm run build` to confirm no errors.
2. Manually trace all flows on paper:
   - Regular 30-min cron cycle → uses enabled sources only, shallow default depth → saves genuinely new jobs → count grows (Part 1 fix confirmed).
   - User disables LinkedIn in settings → next cycle (cron, manual, or export) skips LinkedIn entirely.
   - User clicks "Refresh now" → 1-page shallow scrape on enabled sources → jobs update. User clicks it again 5 minutes later → gets "update in ~25 minutes" message, no new scrape starts.
   - User opens export → picks "3 pages" → sees loading state → deep 3-page scrape runs on enabled sources → completes → export file downloads with the fresh data.
   - Source status panel shows accurate up-to-date health per source after any of the above cycles run.
3. Commit and push everything together with one clear, well-organized commit message (or a few logical sequential commits if that fits the project's existing commit style better) covering: the frozen-count root-cause fix, source selection, manual refresh with cooldown, source health display, and flexible export depth.

Report back clearly:
1. What the actual root cause of the frozen 41-count was, with real before/after numbers proving it's fixed.
2. Where in the UI the source toggles, health indicators, "Refresh now" button, and export depth picker each ended up.
3. Confirmation that all scrape paths (cron/manual/export) consistently respect the enabled-sources setting.