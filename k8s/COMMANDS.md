# Kubernetes Commands Reference Guide

Quick reference for all essential kubectl commands.

---

## 🚀 Cluster Management

```powershell
# Check cluster info
kubectl cluster-info

# View cluster nodes
kubectl get nodes

# View cluster events
kubectl get events

# Check kubectl version
kubectl version

# Get cluster context
kubectl config current-context
```

---

## 📦 Pods

### Create
```powershell
# Run a pod
kubectl run <pod-name> --image=<image>

# Run with command
kubectl run <pod-name> --image=<image> -- <command>

# Example
kubectl run nginx --image=nginx
kubectl run busybox --image=busybox -- sleep 3600
```

### View
```powershell
# List all pods
kubectl get pods

# List with more details
kubectl get pods -o wide

# Watch pods (updates in real-time)
kubectl get pods -w

# Describe pod
kubectl describe pod <pod-name>

# Get pod YAML
kubectl get pod <pod-name> -o yaml
```

### Interact
```powershell
# View logs
kubectl logs <pod-name>

# Follow logs
kubectl logs -f <pod-name>

# Previous logs (crashed pod)
kubectl logs <pod-name> --previous

# Execute command
kubectl exec <pod-name> -- <command>

# Get shell
kubectl exec -it <pod-name> -- /bin/bash
kubectl exec -it <pod-name> -- /bin/sh
```

### Delete
```powershell
# Delete pod
kubectl delete pod <pod-name>

# Force delete
kubectl delete pod <pod-name> --grace-period=0 --force
```

---

## 🚢 Deployments

### Create
```powershell
# Create deployment
kubectl create deployment <name> --image=<image>

# With replicas
kubectl create deployment <name> --image=<image> --replicas=<num>

# Example
kubectl create deployment nginx --image=nginx --replicas=3
```

### View
```powershell
# List deployments
kubectl get deployments

# Describe deployment
kubectl describe deployment <name>

# Get deployment YAML
kubectl get deployment <name> -o yaml
```

### Scale
```powershell
# Scale deployment
kubectl scale deployment <name> --replicas=<num>

# Example
kubectl scale deployment nginx --replicas=5
```

### Update
```powershell
# Update image
kubectl set image deployment/<name> <container>=<new-image>

# Example
kubectl set image deployment/nginx nginx=nginx:1.20

# Check rollout status
kubectl rollout status deployment/<name>

# View rollout history
kubectl rollout history deployment/<name>

# Rollback to previous version
kubectl rollout undo deployment/<name>

# Rollback to specific revision
kubectl rollout undo deployment/<name> --to-revision=<num>
```

### Delete
```powershell
kubectl delete deployment <name>
```

---

## 🌐 Services

### Create
```powershell
# Expose deployment as ClusterIP
kubectl expose deployment <name> --port=<port>

# Expose as NodePort
kubectl expose deployment <name> --type=NodePort --port=<port>

# Expose as LoadBalancer
kubectl expose deployment <name> --type=LoadBalancer --port=<port>

# Example
kubectl expose deployment nginx --type=NodePort --port=80
```

### View
```powershell
# List services
kubectl get services
kubectl get svc  # Short form

# Describe service
kubectl describe service <name>

# Get service URL (Minikube)
minikube service <name> --url

# Open service in browser (Minikube)
minikube service <name>
```

### Delete
```powershell
kubectl delete service <name>
```

---

## ⚙️ ConfigMaps

### Create
```powershell
# From literals
kubectl create configmap <name> --from-literal=<key>=<value>

# From multiple literals
kubectl create configmap <name> `
  --from-literal=key1=value1 `
  --from-literal=key2=value2

# From file
kubectl create configmap <name> --from-file=<file-path>

# From env file
kubectl create configmap <name> --from-env-file=<file.env>

# Example
kubectl create configmap app-config `
  --from-literal=DB_HOST=localhost `
  --from-literal=DB_PORT=3306
```

### View
```powershell
# List ConfigMaps
kubectl get configmaps
kubectl get cm  # Short form

# Describe ConfigMap
kubectl describe configmap <name>

# View as YAML
kubectl get configmap <name> -o yaml
```

### Delete
```powershell
kubectl delete configmap <name>
```

---

## 🔐 Secrets

### Create
```powershell
# From literals
kubectl create secret generic <name> --from-literal=<key>=<value>

# From multiple literals
kubectl create secret generic <name> `
  --from-literal=username=admin `
  --from-literal=password=secret

# From file
kubectl create secret generic <name> --from-file=<file-path>

# TLS secret
kubectl create secret tls <name> --cert=<cert-file> --key=<key-file>

# Example
kubectl create secret generic db-secret `
  --from-literal=password=SuperSecret123
```

### View
```powershell
# List secrets
kubectl get secrets

# Describe secret
kubectl describe secret <name>

# View as YAML (base64 encoded)
kubectl get secret <name> -o yaml

# Decode secret (PowerShell)
kubectl get secret <name> -o jsonpath='{.data.<key>}' | `
  ForEach-Object { [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($_)) }
```

### Delete
```powershell
kubectl delete secret <name>
```

---

## 📄 YAML Files

```powershell
# Apply (create or update)
kubectl apply -f <file.yaml>

# Apply directory
kubectl apply -f <directory>/

# Create (only creates, fails if exists)
kubectl create -f <file.yaml>

# Delete
kubectl delete -f <file.yaml>

# Get YAML of resource
kubectl get <resource> <name> -o yaml

# Export current resource to YAML
kubectl get <resource> <name> -o yaml > resource.yaml
```

---

## 🏷️ Labels & Selectors

```powershell
# Add label to pod
kubectl label pod <pod-name> <key>=<value>

# Remove label
kubectl label pod <pod-name> <key>-

# Get pods by label
kubectl get pods -l <key>=<value>

# Get pods with multiple labels
kubectl get pods -l <key1>=<value1>,<key2>=<value2>

# Delete by label
kubectl delete pods -l <key>=<value>

# Example
kubectl get pods -l env=production
kubectl get pods -l env=production,tier=frontend
```

---

## 🔍 Debugging

```powershell
# Describe resource
kubectl describe <resource> <name>

# View logs
kubectl logs <pod-name>
kubectl logs <pod-name> -c <container-name>  # Multi-container pod

# Follow logs
kubectl logs -f <pod-name>

# Previous logs
kubectl logs <pod-name> --previous

# Execute command
kubectl exec <pod-name> -- <command>

# Get shell
kubectl exec -it <pod-name> -- /bin/bash

# Port forward
kubectl port-forward <pod-name> <local-port>:<pod-port>

# Example
kubectl port-forward nginx-pod 8080:80
# Access: http://localhost:8080

# View events
kubectl get events
kubectl get events --sort-by=.metadata.creationTimestamp
```

---

## 📊 Resource Management

```powershell
# View all resources
kubectl get all

# View specific resource types
kubectl get pods,services,deployments

# View resources in all namespaces
kubectl get pods --all-namespaces
kubectl get pods -A  # Short form

# Delete all resources
kubectl delete all --all

# Delete specific types
kubectl delete deployments,services --all
```

---

## 🧹 Cleanup

```powershell
# Delete everything in current namespace
kubectl delete all --all

# Delete specific resources
kubectl delete pods --all
kubectl delete deployments --all
kubectl delete services --all

# Delete ConfigMaps and Secrets
kubectl delete configmaps --all
kubectl delete secrets --all

# Delete by label
kubectl delete all -l app=myapp
```

---

## 🎮 Minikube Specific

```powershell
# Start Minikube
minikube start

# Stop Minikube
minikube stop

# Delete Minikube
minikube delete

# Check status
minikube status

# Access service
minikube service <service-name>

# Get service URL
minikube service <service-name> --url

# SSH into minikube
minikube ssh

# View dashboard
minikube dashboard

# Enable addon
minikube addons enable <addon-name>

# Example
minikube addons enable ingress

# List addons
minikube addons list

# Use minikube Docker
minikube docker-env
minikube docker-env | Invoke-Expression  # PowerShell
```

---

## 💡 Useful Shortcuts

```powershell
# Short names
po    = pods
svc   = services
deploy = deployments
cm    = configmaps
ns    = namespaces

# Examples
kubectl get po
kubectl get svc
kubectl get deploy
kubectl get cm
```

---

## 🆘 Help

```powershell
# General help
kubectl help

# Command help
kubectl <command> --help

# Explain resource
kubectl explain pod
kubectl explain deployment
kubectl explain service

# Explain specific field
kubectl explain pod.spec
kubectl explain deployment.spec.replicas
```

---

## 📋 Common Workflows

### Deploy an application
```powershell
kubectl create deployment myapp --image=myimage
kubectl expose deployment myapp --type=NodePort --port=80
minikube service myapp
```

### Update application
```powershell
kubectl set image deployment/myapp myapp=myimage:v2
kubectl rollout status deployment/myapp
```

### Debug failing pod
```powershell
kubectl get pods
kubectl describe pod <pod-name>
kubectl logs <pod-name>
kubectl exec -it <pod-name> -- /bin/bash
```

### Scale application
```powershell
kubectl scale deployment myapp --replicas=5
kubectl get pods -w
```

**🎯 Bookmark this page for quick reference!**
