# Kubernetes Basics - Step-by-Step Tutorial

**Goal:** Learn Kubernetes fundamentals through hands-on practice (100% free, runs on your laptop!)

**Time:** ~2-3 hours

---

## 📋 Prerequisites Checklist

Before starting, ensure:
- [ ] Minikube is running: `minikube status`
- [ ] kubectl is working: `kubectl version`
- [ ] Docker is installed: `docker --version`

If minikube isn't running:
```powershell
minikube start
```

---

## 🎯 Learning Path

### Module 1: Understanding Pods (15 minutes)
### Module 2: Working with Deployments (20 minutes)
### Module 3: Exposing with Services (15 minutes)
### Module 4: ConfigMaps & Secrets (20 minutes)
### Module 5: Using YAML Files (30 minutes)
### Module 6: Practice Project (30 minutes)

---

## 📚 Module 1: Understanding Pods

**What is a Pod?**
- Smallest unit in Kubernetes
- Wrapper around one or more containers
- Has its own IP address
- Can die and be recreated anytime

### Exercise 1.1: Create Your First Pod

```powershell
# Create a pod running nginx
kubectl run my-first-pod --image=nginx

# Expected output:
# pod/my-first-pod created
```

**What happened?**
- Kubernetes downloaded nginx image from Docker Hub
- Created a pod named "my-first-pod"
- Started nginx container inside the pod

### Exercise 1.2: View the Pod

```powershell
# List all pods
kubectl get pods

# Expected output:
# NAME           READY   STATUS    RESTARTS   AGE
# my-first-pod   1/1     Running   0          30s
```

**Column meanings:**
- `READY`: 1/1 means 1 container ready out of 1 total
- `STATUS`: Running, Pending, Error, etc.
- `RESTARTS`: How many times the pod restarted
- `AGE`: How long it's been running

### Exercise 1.3: Get Detailed Info

```powershell
# Describe the pod (lots of details!)
kubectl describe pod my-first-pod
```

**Look for:**
- `IP`: Pod's internal IP address
- `Status`: Current state
- `Events`: What happened during creation

### Exercise 1.4: View Pod Logs

```powershell
# See what's happening inside
kubectl logs my-first-pod

# Follow logs in real-time
kubectl logs -f my-first-pod
# Press Ctrl+C to stop
```

### Exercise 1.5: Execute Commands in Pod

```powershell
# Get a shell inside the pod
kubectl exec -it my-first-pod -- /bin/bash

# Inside the pod, try:
# ls
# pwd
# exit
```

### Exercise 1.6: Delete the Pod

```powershell
# Delete the pod
kubectl delete pod my-first-pod

# Verify it's gone
kubectl get pods
```

**✅ Module 1 Complete!** You now understand:
- How to create pods
- How to view pod status
- How to interact with pods
- How to delete pods

---

## 📚 Module 2: Working with Deployments

**What is a Deployment?**
- Manages multiple pods
- Ensures desired number of replicas run
- Auto-restarts failed pods
- Handles updates without downtime

### Exercise 2.1: Create a Deployment

```powershell
# Create deployment with 3 replicas
kubectl create deployment nginx-app --image=nginx --replicas=3

# Expected output:
# deployment.apps/nginx-app created
```

**What happened?**
- Created a Deployment named "nginx-app"
- Deployment created 3 pods automatically
- All running nginx

### Exercise 2.2: View Deployments and Pods

```powershell
# View the deployment
kubectl get deployments

# Expected output:
# NAME        READY   UP-TO-DATE   AVAILABLE   AGE
# nginx-app   3/3     3            3           20s

# View pods created by deployment
kubectl get pods

# You'll see 3 pods with names like:
# nginx-app-xxxxxxxxx-xxxxx
```

### Exercise 2.3: Test Auto-Healing

```powershell
# Delete one pod
kubectl delete pod <pod-name>  # Use actual pod name

# Immediately check pods
kubectl get pods

# You'll see:
# - The deleted pod is Terminating
# - A NEW pod is being Created
# Kubernetes auto-replaced it!
```

**Why?** Deployment ensures 3 replicas always run!

### Exercise 2.4: Scale Up

```powershell
# Scale to 5 replicas
kubectl scale deployment nginx-app --replicas=5

# Watch it happen
kubectl get pods -w
# Press Ctrl+C to stop watching
```

### Exercise 2.5: Scale Down

```powershell
# Scale back to 2
kubectl scale deployment nginx-app --replicas=2

# Check result
kubectl get pods
```

### Exercise 2.6: View Deployment Details

```powershell
kubectl describe deployment nginx-app
```

**Look for:**
- `Replicas`: Desired vs actual
- `Selector`: How deployment finds its pods
- `Events`: History of actions

**✅ Module 2 Complete!** You now understand:
- Creating deployments
- Auto-healing
- Scaling
- Managing replicas

---

## 📚 Module 3: Exposing with Services

**What is a Service?**
- Provides stable network endpoint
- Load balances across pods
- Pods can die, Service stays the same

**Types:**
- `ClusterIP`: Internal only (default)
- `NodePort`: External access via port
- `LoadBalancer`: Cloud load balancer

### Exercise 3.1: Create a Service

```powershell
# Expose the deployment
kubectl expose deployment nginx-app --type=NodePort --port=80

# Expected output:
# service/nginx-app exposed
```

### Exercise 3.2: View Services

```powershell
kubectl get services

# Expected output:
# NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
# kubernetes   ClusterIP   10.96.0.1       <none>        443/TCP        5h
# nginx-app    NodePort    10.100.200.50   <none>        80:30123/TCP   10s
```

**What you see:**
- `kubernetes`: Default service (ignore it)
- `nginx-app`: Your service
- `PORT(S)`: 80:30123 means port 80 mapped to NodePort 30123

### Exercise 3.3: Access the Service

```powershell
# Open service in browser
minikube service nginx-app

# This opens your browser to the nginx welcome page!
```

**What happened?**
- Service load-balanced to one of your 2 pods
- You accessed nginx via stable endpoint

### Exercise 3.4: Get Service URL

```powershell
# Just get the URL without opening browser
minikube service nginx-app --url

# Example output:
# http://192.168.49.2:30123
```

### Exercise 3.5: Test Load Balancing

```powershell
# Get pod names
kubectl get pods -o wide

# Note their IPs, then access service multiple times
# Each request might go to different pod (load balanced)
```

**✅ Module 3 Complete!** You now understand:
- Creating services
- Exposing deployments
- Accessing services
- Load balancing

---

## 📚 Module 4: ConfigMaps & Secrets

**ConfigMap:** Non-sensitive configuration (DB host, ports)
**Secret:** Sensitive data (passwords, tokens)

### Exercise 4.1: Create a ConfigMap

```powershell
# Create from literals
kubectl create configmap app-config `
  --from-literal=APP_NAME="My App" `
  --from-literal=APP_VERSION="1.0"

# View it
kubectl get configmaps

# See details
kubectl describe configmap app-config
```

### Exercise 4.2: Create a Secret

```powershell
# Create secret
kubectl create secret generic app-secret `
  --from-literal=username=admin `
  --from-literal=password=secret123

# View it
kubectl get secrets

# See details (base64 encoded)
kubectl describe secret app-secret
```

### Exercise 4.3: Use ConfigMap in Pod

```powershell
# Create pod using configmap
kubectl apply -f k8s/exercises/ex4-configmap-pod.yaml

# View the pod
kubectl get pods

# Check environment variables inside pod
kubectl exec config-pod -- env | findstr APP_
```

### Exercise 4.4: Use Secret in Pod

```powershell
# Create pod using secret
kubectl apply -f k8s/exercises/ex4-secret-pod.yaml

# Check environment variables
kubectl exec secret-pod -- env | findstr username
```

**✅ Module 4 Complete!** You now understand:
- Creating ConfigMaps
- Creating Secrets
- Using them in pods

---

## 📚 Module 5: Using YAML Files

**Why YAML?**
- Declarative: "I want this state"
- Version control friendly
- Reusable and shareable

### Exercise 5.1: Create Pod from YAML

```powershell
# Apply the YAML file
kubectl apply -f k8s/simple/1-simple-pod.yaml

# View the pod
kubectl get pods

# See full YAML of running pod
kubectl get pod simple-nginx -o yaml
```

### Exercise 5.2: Create Deployment from YAML

```powershell
# Apply deployment
kubectl apply -f k8s/simple/2-simple-deployment.yaml

# View it
kubectl get deployments
kubectl get pods
```

### Exercise 5.3: Create Service from YAML

```powershell
# Apply service
kubectl apply -f k8s/simple/3-simple-service.yaml

# Access it
minikube service simple-service
```

### Exercise 5.4: Update Deployment

```powershell
# Edit the YAML file (change replicas from 2 to 4)
# Then apply again
kubectl apply -f k8s/simple/2-simple-deployment.yaml

# Kubernetes updates it automatically!
kubectl get pods
```

### Exercise 5.5: View All Resources

```powershell
# See everything you created
kubectl get all

# Clean up specific resources
kubectl delete -f k8s/simple/
```

**✅ Module 5 Complete!** You now understand:
- Writing YAML files
- Applying configurations
- Updating resources
- Deleting resources

---

## 📚 Module 6: Practice Project - Deploy a Complete App

**Goal:** Deploy a multi-tier application

### Step 1: Deploy Backend (NestJS)

```powershell
# Apply all backend configs
kubectl apply -f k8s/practice/backend-deployment.yaml
kubectl apply -f k8s/practice/backend-service.yaml
```

### Step 2: Add Configuration

```powershell
kubectl apply -f k8s/practice/app-configmap.yaml
```

### Step 3: Verify Everything

```powershell
# Check all resources
kubectl get all

# Check logs
kubectl logs -l app=backend

# Access the service
minikube service backend-service
```

**✅ Module 6 Complete!** You deployed a complete application!

---

## 🎓 Final Quiz

Test your knowledge:

**Q1:** What command creates a deployment?
<details>
<summary>Answer</summary>
`kubectl create deployment <name> --image=<image> --replicas=<number>`
</details>

**Q2:** How do you scale a deployment to 5 replicas?
<details>
<summary>Answer</summary>
`kubectl scale deployment <name> --replicas=5`
</details>

**Q3:** What's the difference between ConfigMap and Secret?
<details>
<summary>Answer</summary>
ConfigMap: Non-sensitive config (DB host, ports)
Secret: Sensitive data (passwords, base64 encoded)
</details>

**Q4:** How do you access a NodePort service in minikube?
<details>
<summary>Answer</summary>
`minikube service <service-name>`
</details>

**Q5:** What does `kubectl apply -f` do?
<details>
<summary>Answer</summary>
Creates or updates resources from a YAML file
</details>

---

## 🧹 Cleanup

When you're done practicing:

```powershell
# Delete all resources
kubectl delete all --all

# Or delete specific deployments
kubectl delete deployment nginx-app
kubectl delete service nginx-app

# Stop minikube (saves resources)
minikube stop

# Start again later
minikube start
```

---

## 🚀 Next Steps

You've mastered the basics! Continue learning:

1. **Ingress** - Advanced routing
2. **Persistent Volumes** - Storage
3. **StatefulSets** - Stateful apps
4. **Helm** - Package manager
5. **Namespaces** - Resource isolation

---

## 📖 Command Cheat Sheet

```powershell
# Cluster
kubectl cluster-info
minikube status

# Pods
kubectl get pods
kubectl describe pod <name>
kubectl logs <pod-name>
kubectl exec -it <pod-name> -- /bin/bash
kubectl delete pod <name>

# Deployments
kubectl get deployments
kubectl create deployment <name> --image=<image> --replicas=<num>
kubectl scale deployment <name> --replicas=<num>
kubectl delete deployment <name>

# Services
kubectl get services
kubectl expose deployment <name> --type=NodePort --port=<port>
minikube service <name>
kubectl delete service <name>

# ConfigMaps & Secrets
kubectl create configmap <name> --from-literal=key=value
kubectl create secret generic <name> --from-literal=key=value
kubectl get configmaps
kubectl get secrets

# YAML files
kubectl apply -f <file.yaml>
kubectl delete -f <file.yaml>
kubectl get all

# Cleanup
kubectl delete all --all
minikube stop
```

**🎉 Congratulations! You've completed the Kubernetes Basics Tutorial!**
