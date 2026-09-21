
أيوه. راجعت **الـOfficial Kubernetes Docs الحالية**، والأفضل فعلًا إننا نمشي حسب الـstructure بتاعهم بدل القائمة الـ122. الـDocs نفسها بتقسم الـConcepts إلى أقسام رئيسية مثل Architecture, Workloads, Services/Networking, Storage, Configuration, Security, Scheduling وResource Management. ([Kubernetes](https://kubernetes.io/docs/concepts/?utm_source=chatgpt.com "Concepts | Kubernetes"))

## Kubernetes Docs Roadmap

### 1. Overview

- What is Kubernetes?
- Why Kubernetes?
- What Kubernetes does
- Declarative configuration
- Desired State

[Kubernetes Overview](https://kubernetes.io/docs/concepts/overview/?utm_source=chatgpt.com)

---
### 2. Cluster Architecture

- Kubernetes Components
- Control Plane
- Nodes
- API Server
- etcd
- Scheduler
- Controller Manager
- Kubelet
- Container Runtime
- Kubernetes API

[Cluster Architecture](https://kubernetes.io/docs/concepts/architecture/?utm_source=chatgpt.com)

---
### 3. Objects in Kubernetes

- Kubernetes Objects
- Object Names and IDs
- Namespaces
- Labels and Selectors
- Annotations
- Fields / Spec
- Object Management
- Declarative Management

[Objects in Kubernetes](https://kubernetes.io/docs/concepts/overview/working-with-objects/?utm_source=chatgpt.com)

---

### 4. kubectl

- kubectl overview
- kubectl syntax
- Declarative management
	- `get
	- `describe`
	- `apply`
	- `create`
	- `delete`
	- `logs`
	- `exec`
	- `explain`
	- `config`
	- contexts

[kubectl Documentation](https://kubernetes.io/docs/reference/kubectl/?utm_source=chatgpt.com)
[kubectl Quick Reference](https://kubernetes.io/docs/reference/kubectl/quick-reference/?utm_source=chatgpt.com)

---

# 5. Workloads


### ابدأ بـ:

**Pods**

- Pod concept
- Pod lifecycle
- Pod template
- Init Containers
- Multi-container Pods

**ReplicaSet**

- ReplicaSet concept
- Scaling

**Deployment**

- Deployment concept
- Updating
- Rolling updates
- Rollbacks
- Scaling

- StatefulSets
- DaemonSets
- Jobs
- CronJobs

[Workloads](https://kubernetes.io/docs/concepts/workloads/?utm_source=chatgpt.com)

---
# 6. Services, Load Balancing & Networking

ذاكر بالترتيب:

### Networking basics

- Kubernetes Network Model
- Pod networking
- Pod IP


### Services

- Service
- Service discovery
- ClusterIP
- NodePort
- LoadBalancer
- Headless Service

### DNS

- DNS for Services and Pods

### Ingress

- Ingress
- Ingress Controller


### بعدين

- NetworkPolicy

[Services, Load Balancing, and Networking](https://kubernetes.io/docs/concepts/services-networking/?utm_source=chatgpt.com)

---

# 7. Configuration

### ConfigMaps

- ConfigMap
- Environment variables
- ConfigMap as volume


### Secrets

- Secret
- Secret types
- Using Secrets as environment variables
- Using Secrets as files

### Container configuration

- Environment variables
- Container command / arguments

[Configuration](https://kubernetes.io/docs/concepts/configuration/?utm_source=chatgpt.com)

---

# 8. Resource Management


- CPU
- Memory
- Resource Requests
- Resource Limits
- QoS Classes

الفكرة الأساسية:

```text
Request = Kubernetes يحجز للتطبيق

Limit = أقصى Resource مسموح للتطبيق
```

[Resource Management](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/?utm_source=chatgpt.com)

---

# 9. Scheduling

ذاكر الأساسيات:

- Scheduling
- NodeSelector
- Node Affinity
- Pod Affinity
- Pod Anti-Affinity
- Taints
- Tolerations

[Scheduling, Preemption and Eviction](https://kubernetes.io/docs/concepts/scheduling-eviction/?utm_source=chatgpt.com)

---

# 10. Storage

ذاكر بالترتيب:

- Volumes
- PersistentVolume (PV)
- PersistentVolumeClaim (PVC)
- StorageClass
- Dynamic Volume Provisioning
- StatefulSet + Persistent Storage

[Storage](https://kubernetes.io/docs/concepts/storage/?utm_source=chatgpt.com)

---

# 11. Probes / Application Health

ذاكر:

- Liveness Probe
- Readiness Probe
- Startup Probe

ودي مهمة جدًا في الـDeployments والـproduction.

[Liveness, Readiness and Startup Probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/?utm_source=chatgpt.com)

---

# 12. Security

في البداية خليك في:

- Authentication
- Authorization
- RBAC
- Role
- ClusterRole
- RoleBinding
- ClusterRoleBinding
- ServiceAccounts
- Secrets
- Pod Security Standards
- NetworkPolicy

[Kubernetes Security](https://kubernetes.io/docs/concepts/security/?utm_source=chatgpt.com)

الـDocs نفسها بتضع التحكم في الـAPI، Secrets، Pod Security وNetwork Policies ضمن آليات Kubernetes الأمنية الأساسية. ([Kubernetes](https://kubernetes.io/docs/concepts/security/?utm_source=chatgpt.com "Security | Kubernetes"))

---

# 13. Troubleshooting

وده **مش Concept section منفصل بنفس شكل اللي فوق**، لكن لازم تعمله عمليًا.

ركز على:

- `kubectl get`
    
- `kubectl describe`
    
- `kubectl logs`
    
- `kubectl exec`
    
- Events
    
- Pending Pods
    
- CrashLoopBackOff
    
- ImagePullBackOff
    
- Service connectivity
    
- DNS problems
    
- Resource problems
    

[Debugging / Troubleshooting](https://kubernetes.io/docs/tasks/debug/?utm_source=chatgpt.com)

---

# Roadmap

```text
1. Overview
2. Cluster Architecture
3. Kubernetes Objects
4. Namespaces
5. Labels & Selectors
6. kubectl
7. Pods -- Day 1
8. ReplicaSets
9. Deployments
10. StatefulSets
11. DaemonSets
12. Jobs & CronJobs -- Day 2
13. Services
14. Networking & DNS
15. Ingress
16. ConfigMaps
17. Secrets -- Day 3
18. Resource Requests & Limits
19. Scheduling Basics
20. Volumes / PV / PVC / StorageClass
21. Liveness / Readiness / Startup Probes
22. RBAC & ServiceAccounts
23. NetworkPolicy
24. Troubleshooting -- Day 4
```

