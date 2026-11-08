---
title: "Kubernetes Labels and Selectors"
aliases: ["Labels and Selectors", "Kubernetes Label Selector"]
type: permanent
status: evergreen
domain: devops-infrastructure
tags: [permanent, kubernetes, labels, selectors, devops]
created: 2026-11-08
updated: 2026-11-08
source: "[[30 Sources/DEPI/Study/DevOps/Kubernetes/Kubernetes D1 Refactoring]]"
related: ["[[20 Zettelkasten/Permanent Notes/Kubernetes Cluster Architecture]]", "[[30 Sources/DEPI/Study/DevOps/Kubernetes/Kubernetes Day 1]]", "[[10 Maps of Content/DevOps and Infrastructure MOC]]"]
---

# Kubernetes Labels and Selectors

## Idea

Labels are `key: value` metadata attached to Kubernetes objects for identification and grouping. Selectors are queries over those labels. Together they let objects find and manage each other **without hard-coding names**, which is what keeps Kubernetes resources loosely coupled.

## Explanation

### Labels

A label is a key/value pair placed under `metadata.labels`:

```yaml
metadata:
  labels:
    environment: production
    app: nginx
```

Labels are used for organisation, grouping, filtering, and selection. They can be added or changed after an object is created, and they do **not** have to be unique: many objects may carry the same label.

Common label dimensions in the source:

```text
release: stable / canary
environment: dev / qa / production
tier: frontend / backend / cache
role: master / replica
```

### Labels vs annotations

| | Purpose |
|---|---|
| **Labels** | Identification, selection, and filtering. |
| **Annotations** | Extra information that is not used to select objects. |

Annotations can hold arbitrary strings, including spaces or JSON/YAML, but the total annotations for one object must stay within 256 KiB.

### Label selectors

Kubernetes selects objects by label with two selector styles.

**Equality-based** — `=`, `==`, `!=`:

```text
environment=production
environment=production,tier!=frontend
```

**Set-based** — `in`, `notin`, `exists`:

```text
environment in (production, qa)
tier notin (frontend, backend)
partition
!partition
```

A comma always means AND. There is no direct `||` operator, but `in` can express an OR.

### Selectors in manifests

A Service uses a selector to decide which Pods receive traffic:

```yaml
selector:
  app: nginx
```

A Deployment uses the same idea to decide which Pods it owns:

```yaml
selector:
  matchLabels:
    app: nginx
```

The labels on the Pods created from the template must match the Deployment's selector.

Selectors can also combine exact matches with expressions:

```yaml
selector:
  matchLabels:
    component: redis
  matchExpressions:
    - key: tier
      operator: In
      values:
        - cache
```

`matchLabels` is a direct key/value match. `matchExpressions` supports `In`, `NotIn`, `Exists`, and `DoesNotExist`. All conditions must hold (AND).

## Why it matters

- A Service does not need to know Pod names; it only needs the label selector, so Pods can be replaced or rescheduled freely.
- A Deployment tracks its Pods by label rather than by identity.
- Labels are mutable, which makes them useful for releases, environments, and canary routing.
- Labels are for **selection**; annotations are for **information**. Mixing the two roles leads to brittle manifests.
- Labels are not ownership. Cleanup of related objects relies on owner references, not labels.

## Related

- [[20 Zettelkasten/Permanent Notes/Kubernetes Cluster Architecture]]
- [[30 Sources/DEPI/Study/DevOps/Kubernetes/Kubernetes Day 1]]
- [[30 Sources/DEPI/Study/DevOps/Kubernetes/Kubernetes D1 Refactoring]]
- [[10 Maps of Content/DevOps and Infrastructure MOC]]

## Source

- `Kubernetes D1 Refactoring.md`, §7 "Labels" (label examples, label dimensions, labels vs annotations, equality-based and set-based selectors, Service and Deployment selectors, `matchLabels` and `matchExpressions`).
- `Kubernetes Day 1.md` contains the longer overlapping treatment; both remain as sources.
