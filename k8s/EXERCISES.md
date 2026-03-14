# Kubernetes Practice Exercises

Complete these exercises to test your knowledge!

---

## Exercise 1: Create a Pod

**Task:** Create a pod named `test-pod` running the `busybox` image that sleeps for 3600 seconds.

**Hint:**
```powershell
kubectl run test-pod --image=busybox -- sleep 3600
```

**Verify:**
```powershell
kubectl get pods
kubectl describe pod test-pod
```

**Solution:**
<details>
<summary>Click to reveal</summary>

```powershell
kubectl run test-pod --image=busybox -- sleep 3600
```

</details>

---

## Exercise 2: Scale a Deployment

**Task:** 
1. Create a deployment named `web` with image `nginx` and 2 replicas
2. Scale it to 5 replicas
3. Scale it back to 1 replica

**Solution:**
<details>
<summary>Click to reveal</summary>

```powershell
# Create deployment
kubectl create deployment web --image=nginx --replicas=2

# Scale to 5
kubectl scale deployment web --replicas=5

# Verify
kubectl get deployments

# Scale to 1
kubectl scale deployment web --replicas=1

# Verify
kubectl get pods
```

</details>

---

## Exercise 3: Expose a Deployment

**Task:**
1. Create deployment `myapp` with image `nginx`
2. Expose it as a NodePort service on port 80
3. Access it in your browser

**Solution:**
<details>
<summary>Click to reveal</summary>

```powershell
# Create deployment
kubectl create deployment myapp --image=nginx

# Expose
kubectl expose deployment myapp --type=NodePort --port=80

# Access
minikube service myapp
```

</details>

---

## Exercise 4: Create ConfigMap and Use It

**Task:**
1. Create a ConfigMap named `db-config` with:
   - `DB_HOST=mysql-server`
   - `DB_PORT=3306`
2. Create a pod that uses this ConfigMap

**Solution:**
<details>
<summary>Click to reveal</summary>

```powershell
# Create ConfigMap
kubectl create configmap db-config `
  --from-literal=DB_HOST=mysql-server `
  --from-literal=DB_PORT=3306

# Verify
kubectl get configmap db-config -o yaml

# Create pod using it
# Use the YAML file: k8s/exercises/ex4-configmap-pod.yaml
kubectl apply -f k8s/exercises/ex4-configmap-pod.yaml
```

</details>

---

## Exercise 5: Working with Secrets

**Task:**
1. Create a Secret named `db-secret` with:
   - `username=dbadmin`
   - `password=SuperSecret123`
2. View the secret (notice it's base64 encoded)
3. Decode the password

**Solution:**
<details>
<summary>Click to reveal</summary>

```powershell
# Create secret
kubectl create secret generic db-secret `
  --from-literal=username=dbadmin `
  --from-literal=password=SuperSecret123

# View it
kubectl get secret db-secret -o yaml

# Decode password (PowerShell)
kubectl get secret db-secret -o jsonpath='{.data.password}' | ForEach-Object { [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($_)) }
```

</details>

---

## Exercise 6: Update a Deployment

**Task:**
1. Create deployment `webapp` with image `nginx:1.19`
2. Update it to use `nginx:1.20`
3. Check the rollout status

**Solution:**
<details>
<summary>Click to reveal</summary>

```powershell
# Create
kubectl create deployment webapp --image=nginx:1.19

# Update image
kubectl set image deployment/webapp nginx=nginx:1.20

# Check status
kubectl rollout status deployment/webapp

# View history
kubectl rollout history deployment/webapp
```

</details>

---

## Exercise 7: Labels and Selectors

**Task:**
1. Create 3 pods with different labels
2. List pods with specific label
3. Delete pods by label

**Solution:**
<details>
<summary>Click to reveal</summary>

```powershell
# Create pods with labels
kubectl run pod1 --image=nginx --labels=env=dev,tier=frontend
kubectl run pod2 --image=nginx --labels=env=prod,tier=frontend
kubectl run pod3 --image=nginx --labels=env=dev,tier=backend

# List pods with env=dev
kubectl get pods -l env=dev

# List pods with tier=frontend
kubectl get pods -l tier=frontend

# Delete pods with env=dev
kubectl delete pods -l env=dev
```

</details>

---

## Exercise 8: Logs and Debugging

**Task:**
1. Create a deployment with nginx
2. View logs from one of the pods
3. Execute a command inside the pod to check nginx version

**Solution:**
<details>
<summary>Click to reveal</summary>

```powershell
# Create deployment
kubectl create deployment debug-app --image=nginx

# Get pod name
kubectl get pods

# View logs (replace <pod-name>)
kubectl logs <pod-name>

# Execute command
kubectl exec <pod-name> -- nginx -v

# Get shell
kubectl exec -it <pod-name> -- /bin/bash
# Inside: nginx -v, ls, exit
```

</details>

---

## Exercise 9: Complete Application

**Task:** Deploy a complete application:
1. Create ConfigMap for app configuration
2. Create deployment using the ConfigMap
3. Expose it as a service
4. Access it in browser

**Solution:**
<details>
<summary>Click to reveal</summary>

```powershell
# Apply all practice files
kubectl apply -f k8s/practice/

# Check everything
kubectl get all

# Access
minikube service backend-service
```

</details>

---

## Exercise 10: Cleanup Challenge

**Task:** Clean up all resources you created in exercises 1-9

**Solution:**
<details>
<summary>Click to reveal</summary>

```powershell
# Delete specific resources
kubectl delete pod test-pod
kubectl delete deployment web
kubectl delete deployment myapp
kubectl delete service myapp
kubectl delete configmap db-config
kubectl delete secret db-secret
kubectl delete deployment webapp
kubectl delete deployment debug-app

# Or delete everything
kubectl delete all --all

# Delete ConfigMaps and Secrets separately
kubectl delete configmaps --all
kubectl delete secrets --all
```

</details>

---

## 🎯 Challenge: Create a Multi-Tier App

**Advanced Task:**
Create a 3-tier application:
- Frontend (nginx)
- Backend (your choice)
- Database (mysql)

Requirements:
- Use ConfigMaps for configuration
- Use Secrets for database credentials
- All tiers should be accessible
- Backend should connect to database

**Hint:** Look at the files in `k8s/practice/` for inspiration!

---

## ✅ Checklist

Track your progress:

- [ ] Exercise 1: Create a Pod
- [ ] Exercise 2: Scale a Deployment
- [ ] Exercise 3: Expose a Deployment
- [ ] Exercise 4: Create ConfigMap
- [ ] Exercise 5: Working with Secrets
- [ ] Exercise 6: Update a Deployment
- [ ] Exercise 7: Labels and Selectors
- [ ] Exercise 8: Logs and Debugging
- [ ] Exercise 9: Complete Application
- [ ] Exercise 10: Cleanup

**🎉 Complete all exercises to master Kubernetes basics!**
