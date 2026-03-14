# Kubernetes Deployment Guide for NestJS Project

This directory contains complete Kubernetes configurations for deploying your NestJS application.

## 📁 Files Overview

| File | Purpose | What It Does |
|------|---------|-------------|
| `1-deployment.yaml` | App Deployment & Service | Runs your NestJS app with 3 replicas, load balancing |
| `2-configmap.yaml` | Environment Variables | Non-sensitive config (DB host, ports, API URLs) |
| `3-secrets.yaml` | Sensitive Data | Passwords, API keys, JWT secrets |
| `4-ingress.yaml` | Advanced Routing | External access, HTTPS, path-based routing |
| `5-persistent-volume.yaml` | Storage | Database data, file uploads persistence |

## 🚀 Quick Start

### Prerequisites
```bash
# Option 1: Minikube (Local K8s)
minikube start
minikube addons enable ingress

# Option 2: Docker Desktop
# Enable Kubernetes in Docker Desktop settings

# Verify K8s is running
kubectl cluster-info
kubectl get nodes
```

### Step 1: Build Docker Image
```bash
# Build your NestJS app image
docker build -t your-registry/nestjs-app:latest .

# For Minikube, use Minikube's Docker daemon
eval $(minikube docker-env)
docker build -t nestjs-app:latest .
```

### Step 2: Deploy to Kubernetes
```bash
# Deploy in order
kubectl apply -f k8s/2-configmap.yaml
kubectl apply -f k8s/3-secrets.yaml
kubectl apply -f k8s/5-persistent-volume.yaml
kubectl apply -f k8s/1-deployment.yaml
kubectl apply -f k8s/4-ingress.yaml

# Or deploy all at once
kubectl apply -f k8s/
```

### Step 3: Verify Deployment
```bash
# Check pods are running
kubectl get pods

# Check services
kubectl get services

# Check ingress
kubectl get ingress

# View logs
kubectl logs -f <pod-name>

# Describe pod for details
kubectl describe pod <pod-name>
```

### Step 4: Access Your App
```bash
# Get service URL (for LoadBalancer)
kubectl get service nestjs-service

# For Minikube
minikube service nestjs-service --url

# For Ingress
# Add to /etc/hosts: 127.0.0.1 myproject.local
# Then access: http://myproject.local
```

## 📚 Detailed Guides

### ConfigMaps (Environment Variables)

**What:** Store non-sensitive configuration
**Example:** Database host, API URLs, feature flags

```bash
# View ConfigMap
kubectl get configmap nestjs-config -o yaml

# Edit ConfigMap
kubectl edit configmap nestjs-config

# Restart pods to pick up changes
kubectl rollout restart deployment nestjs-app
```

**Real-world usage in NestJS:**
```typescript
// Your app automatically gets these as environment variables
const dbHost = process.env.DB_HOST; // From ConfigMap
const port = process.env.PORT;      // From ConfigMap
```

---

### Secrets (Sensitive Data)

**What:** Store passwords, API keys, tokens (base64 encoded)
**Example:** Database password, JWT secret

```bash
# Create secret from command line (recommended)
kubectl create secret generic nestjs-secrets \
  --from-literal=db-password=myPassword123 \
  --from-literal=jwt-secret=superSecret

# View secrets (base64 encoded)
kubectl get secret nestjs-secrets -o yaml

# Decode a secret
kubectl get secret nestjs-secrets -o jsonpath='{.data.db-password}' | base64 -d
```

**⚠️ Security Tips:**
- Never commit `3-secrets.yaml` with real secrets to Git!
- Use sealed-secrets or external secret managers in production
- Rotate secrets regularly

---

### Ingress (Advanced Routing)

**What:** External access with routing, SSL, load balancing
**Example:** Route `/api` to backend, `/` to frontend

```bash
# Enable Ingress (Minikube)
minikube addons enable ingress

# Check Ingress status
kubectl get ingress

# Get Ingress IP
kubectl get ingress nestjs-ingress

# Test locally
# 1. Add to /etc/hosts:
#    127.0.0.1 myproject.local
# 2. Access:
#    http://myproject.local/api/users
```

**Routing Examples:**
- `http://myproject.local/api/users` → Users service
- `http://myproject.local/api/products` → Products service
- `http://api.example.com` → Main API

---

### Persistent Volumes (Storage)

**What:** Persistent storage that survives pod restarts
**Example:** Database data, uploaded files

**Architecture:**
```
Pod → PVC (request) → PV (actual storage) → Data
```

```bash
# View volumes
kubectl get pv
kubectl get pvc

# Check binding status
kubectl describe pvc mysql-pvc

# Access pod to verify data
kubectl exec -it <mysql-pod> -- /bin/bash
mysql -u root -p
```

**Access Modes:**
- **ReadWriteOnce (RWO):** One node, read/write (databases)
- **ReadOnlyMany (ROX):** Many nodes, read-only (static files)
- **ReadWriteMany (RWX):** Many nodes, read/write (uploads) - needs NFS/cloud

---

## 🛠️ Common Commands

### Deployment Management
```bash
# Scale app
kubectl scale deployment nestjs-app --replicas=5

# Update image
kubectl set image deployment/nestjs-app nestjs=nestjs-app:v2

# Rollout status
kubectl rollout status deployment/nestjs-app

# Rollback
kubectl rollout undo deployment/nestjs-app

# View history
kubectl rollout history deployment/nestjs-app
```

### Debugging
```bash
# View logs
kubectl logs <pod-name>
kubectl logs -f <pod-name>  # Follow logs
kubectl logs <pod-name> --previous  # Previous crashed pod

# Execute commands in pod
kubectl exec -it <pod-name> -- /bin/bash
kubectl exec -it <pod-name> -- npm run test

# Port forwarding (access pod directly)
kubectl port-forward <pod-name> 3000:3000
# Access: http://localhost:3000

# Describe resources
kubectl describe pod <pod-name>
kubectl describe service nestjs-service
kubectl describe ingress nestjs-ingress
```

### Resource Viewing
```bash
# View all resources
kubectl get all

# Wide output (more details)
kubectl get pods -o wide

# YAML output
kubectl get deployment nestjs-app -o yaml

# JSON output
kubectl get pod <pod-name> -o json

# Watch changes
kubectl get pods -w
```

### Cleanup
```bash
# Delete specific resource
kubectl delete deployment nestjs-app
kubectl delete service nestjs-service

# Delete all resources from file
kubectl delete -f k8s/

# Delete everything in namespace
kubectl delete all --all
```

## 🎯 Production Checklist

Before deploying to production:

- [ ] Use proper image registry (Docker Hub, AWS ECR, Azure ACR)
- [ ] Set image tags (not `:latest`)
- [ ] Configure resource limits
- [ ] Set up health checks (liveness/readiness probes)
- [ ] Use secrets manager (AWS Secrets Manager, Azure Key Vault)
- [ ] Enable TLS/HTTPS
- [ ] Set up monitoring (Prometheus, Grafana)
- [ ] Configure logging (ELK Stack, Fluentd)
- [ ] Set up auto-scaling (HPA)
- [ ] Configure network policies
- [ ] Set up backup strategy
- [ ] Enable RBAC for security
- [ ] Use namespaces for isolation

## 📖 Learning Resources

**Next Steps:**
1. ✅ Deploy your app (you're here!)
2. Learn Horizontal Pod Autoscaling (HPA)
3. Explore Helm (package manager for K8s)
4. Study StatefulSets (for databases)
5. Learn about Service Mesh (Istio)

**Useful Commands:**
```bash
# K8s cheat sheet
kubectl help

# Explain any resource
kubectl explain pod
kubectl explain deployment.spec
```

## 🐛 Troubleshooting

### Pod won't start
```bash
kubectl describe pod <pod-name>
kubectl logs <pod-name>
```

### Can't access service
```bash
# Check service endpoints
kubectl get endpoints nestjs-service

# Port forward to test
kubectl port-forward service/nestjs-service 8080:80
```

### ConfigMap/Secret not updating
```bash
# Restart deployment
kubectl rollout restart deployment nestjs-app
```

### PVC not binding
```bash
kubectl describe pvc <pvc-name>
# Check if PV exists with matching storage class
kubectl get pv
```

## 📞 Need Help?

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
- [Minikube Docs](https://minikube.sigs.k8s.io/docs/)
