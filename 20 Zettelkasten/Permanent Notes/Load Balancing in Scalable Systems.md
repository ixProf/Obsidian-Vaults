---
title: "Load Balancing in Scalable Systems"
aliases: ["Load Balancer", "Load Balancing"]
type: permanent
status: evergreen
domain: system-design
tags: [permanent, system-design, scalability, load-balancing]
created: 2026-11-08
updated: 2026-11-08
source: "[[20 Zettelkasten/Literature Notes/System Design Interview by Alex Xu]]"
related: ["[[30 Sources/Other Sources/My Master/Roadmap/Load Balancer in Web Applications]]", "[[20 Zettelkasten/Literature Notes/DDIA/Chapter 1/DDIA — Reliability]]", "[[10 Maps of Content/System Design MOC]]"]
---

# Load Balancing in Scalable Systems

## Idea

A load balancer turns a group of servers into a single address and distributes incoming requests across them. That is what makes **horizontal scaling** of a web tier possible, and it also lets traffic avoid a failed server — but it does not remove bottlenecks that sit behind the servers.

## Explanation

### What it does

A load balancer receives requests and forwards each one to one of several servers. It solves the problem that a single server eventually reaches its limit, whether in request volume or resource consumption.

Users connect to the load balancer's public address; the load balancer talks to the web servers over the internal network. The web servers therefore do not need to be exposed directly to the internet. This reduces direct exposure, though it is not a substitute for proper security controls.

### Why it enables scalability

If one server handles a given load, adding another server and registering it with the load balancer increases capacity. This is horizontal scaling of the web tier: capacity grows by adding machines rather than by enlarging one machine.

### Failure handling

If a server fails, the load balancer can send its traffic to another server. For this to work correctly, the system must detect that the failed server is unhealthy. **Health checks** test whether a server can accept and process requests; a server that fails them can be temporarily removed from the pool.

### What it does not solve

The load balancer distributes requests; it does not fix everything behind them:

- **Database bottleneck** — if every web server depends on a slow database, adding web servers does not make the database faster.
- **Stateful sessions** — if session data lives only inside one server, the next request may reach a different server and fail to find it.
- **Load balancer failure** — a single load balancer is itself a single point of failure.
- **Shared dependencies** — if all web servers depend on a shared service that is down, more web servers do not help.

The source's conclusion: a load balancer helps distribute requests, but it is not a replacement for designing the system to tolerate failure and for monitoring every important component.

## Why it matters

- It is the standard mechanism for scaling a stateless web tier horizontally.
- It separates the public entry point from the servers that do the work.
- Health checks make server failure survivable only if the system can actually detect failure.
- It clarifies a common misconception: more servers do not fix a slow database, shared state, or a single load balancer.
- It pairs naturally with the move to a stateless tier and with replication for the data layer.

## Related

- [[30 Sources/Other Sources/My Master/Roadmap/Load Balancer in Web Applications]]
- [[20 Zettelkasten/Literature Notes/System Design Interview by Alex Xu]]
- [[20 Zettelkasten/Literature Notes/DDIA/Chapter 1/DDIA — Reliability]]
- [[10 Maps of Content/System Design MOC]]
- [[10 Maps of Content/Distributed Systems MOC]]

## Source

- `System Design Interview by Alex Xu.md`, §6 "Load Balancer" (definition, architecture, horizontal scaling, health checks, public/private IP, and the limits: database bottleneck, stateful sessions, load balancer failure, shared dependencies).
- `Load Balancer in Web Applications.md` is a separate treatment of the same topic and remains a source.
