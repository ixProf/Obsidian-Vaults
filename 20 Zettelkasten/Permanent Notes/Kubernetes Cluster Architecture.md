---
title: "Kubernetes Cluster Architecture"
aliases: ["Kubernetes Components", "Control Plane and Nodes"]
type: permanent
status: evergreen
domain: devops-infrastructure
tags: [permanent, kubernetes, architecture, devops]
created: 2026-11-08
updated: 2026-11-08
source: "[[30 Sources/DEPI/Study/DevOps/Kubernetes/Kubernetes D1 Refactoring]]"
related: ["[[20 Zettelkasten/Permanent Notes/Kubernetes Labels and Selectors]]", "[[30 Sources/DEPI/Study/DevOps/Kubernetes/Kubernetes Day 1]]", "[[10 Maps of Content/DevOps and Infrastructure MOC]]"]
---

# Kubernetes Cluster Architecture

## Idea

A Kubernetes cluster has two cooperating layers: the **control plane**, which decides what the cluster should do, and the **worker nodes**, which run the workloads.

## Explanation

### Control plane

| Component | Responsibility |
|---|---|
| `kube-apiserver` | The entry point for the Kubernetes HTTP API. |
| `etcd` | Consistent, highly available key-value store for cluster state. |
| `kube-scheduler` | Chooses a suitable node for each new Pod. |
| `kube-controller-manager` | Runs controllers that reconcile current state toward desired state. |
| `cloud-controller-manager` | Optional integration with a cloud provider. |

### Worker nodes

| Component | Responsibility |
|---|---|
| `kubelet` | Agent on each node; ensures the assigned Pods and their containers are running. |
| `kube-proxy` | Optional; maintains network rules so Services can route traffic. |
| `Container runtime` | Runs the containers, for example containerd or CRI-O. |

### Addons

Common addons include cluster DNS, a dashboard, container resource monitoring, and cluster-level logging. They provide features beyond the core components.

The architecture is deliberately flexible: the same components can support a small development cluster and a large production environment.

## Why it matters

- It explains the split between "what should happen" (control plane) and "what is running" (nodes).
- It gives a place to look when debugging: API access, scheduling, node health, or container runtime.
- It explains why losing the control plane does not immediately stop running containers, but prevents the cluster from reconciling changes.

## Related

- [[20 Zettelkasten/Permanent Notes/Kubernetes Labels and Selectors]]
- [[30 Sources/DEPI/Study/DevOps/Kubernetes/Kubernetes Day 1]]
- [[30 Sources/DEPI/Study/DevOps/Kubernetes/Kubernetes D1 Refactoring]]
- [[10 Maps of Content/DevOps and Infrastructure MOC]]

## Source

- `Kubernetes D1 Refactoring.md`, §3 "Kubernetes Components" (control plane, node components, addons, architectural flexibility).
- `Kubernetes Day 1.md` contains the longer overlapping treatment; both remain as sources.
