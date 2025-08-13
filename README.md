# Hotstar Next.js on Kubernetes (DevSecOps)

Deploy a **Hotstar-style Next.js** app to **Kubernetes on Amazon EKS** with a modern **DevSecOps** workflow: CI/CD (Jenkins), code quality (SonarQube), container security (Trivy), and monitoring (Prometheus & Grafana). Infrastructure via **Terraform**.

---

## 🔧 Stack

- **Version Control:** GitHub  
- **CI/CD:** Jenkins  
- **Quality:** SonarQube  
- **Containers:** Docker  
- **Orchestration:** Kubernetes (EKS)  
- **Monitoring:** Prometheus, Grafana  
- **Security:** OWASP best practices, Trivy  
- **IaC:** Terraform

---

## 🚀 What You’ll Get

- Dockerized Next.js app  
- Jenkins pipeline (build → test → scan → image → deploy)  
- SonarQube code analysis  
- Trivy image scanning  
- EKS deployment  
- Prometheus & Grafana dashboards  
- Optional Terraform for infra

---

## ⚡ Quick Start

> Replace all **Required** values shown like **Required:** *\<value\>*.

### 1) Run locally with Docker
```bash
# Build
docker build -t <registry>/hotstar-app:<tag> .

# Run
docker run -p 3000:3000 <registry>/hotstar-app:<tag>
# Open: http://localhost:3000
```
- **Required:** *<registry>* → e.g., `docker.io/yourname` or `1234567890.dkr.ecr.us-east-1.amazonaws.com`  
- **Required:** *<tag>* → e.g., `v1` or `latest`

### 2) Push the image
```bash
docker login
docker push <registry>/hotstar-app:<tag>
```

### 3) Deploy to Kubernetes
```bash
# If your manifests are in k8s/
kubectl apply -f k8s/
kubectl get pods -n <namespace>
```
- **Required:** *<namespace>* → e.g., `default` or `hotstar`

---

## ☁️ Create EKS (choose one)

### Option A) Terraform
```bash
cd infra/eks            # adjust if different
terraform init
terraform apply -auto-approve
```

### Option B) eksctl
```bash
eksctl create cluster --name hotstar-eks --nodes 3 --region <aws-region>
```
- **Required:** *<aws-region>* → e.g., `us-east-1`

---

## 📈 Monitoring (Prometheus & Grafana)
```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install monitoring prometheus-community/kube-prometheus-stack -n monitoring --create-namespace
kubectl get pods -n monitoring
```

Grafana (port-forward):
```bash
kubectl -n monitoring port-forward svc/monitoring-grafana 3001:80
# Open: http://localhost:3001
```

---

## 🛡️ Security & Quality

**Trivy (image scan)**
```bash
trivy image <registry>/hotstar-app:<tag>
```

**SonarQube (code scan)**
```bash
sonar-scanner \
  -Dsonar.projectKey=hotstar-nextjs \
  -Dsonar.host.url=http://<sonarqube-host> \
  -Dsonar.login=<token>
```
- **Required:** *<sonarqube-host>* → e.g., `sonarqube.local:9000`  
- **Required:** *<token>* → SonarQube user token

**OWASP Tips**
- Don’t commit secrets. Use Kubernetes Secrets / AWS Secrets Manager.  
- Apply least privilege for service accounts.  
- Keep dependencies updated.

---

## 🧪 Example Jenkins Pipeline (Declarative)

```groovy
pipeline {
  agent any
  environment {
    REGISTRY  = '<registry>'     // **Required**
    IMAGE     = 'hotstar-app'
    TAG       = "${env.BUILD_NUMBER}"
    NAMESPACE = '<namespace>'    // **Required**
  }
  stages {
    stage('Checkout') { steps { checkout scm } }
    stage('Install & Test') { steps { sh 'npm ci && npm test' } }
    stage('SonarQube') { steps { sh 'sonar-scanner' } }
    stage('Build Image') { steps { sh "docker build -t $REGISTRY/$IMAGE:$TAG ." } }
    stage('Trivy Scan') { steps { sh "trivy image --exit-code 0 $REGISTRY/$IMAGE:$TAG" } }
    stage('Push Image') { steps { sh "docker push $REGISTRY/$IMAGE:$TAG" } }
    stage('Deploy to K8s') {
      steps {
        sh """
          kubectl apply -f k8s/
          kubectl rollout status deploy/$IMAGE -n $NAMESPACE
        """
      }
    }
  }
  post {
    always { archiveArtifacts artifacts: '**/reports/**/*', allowEmptyArchive: true }
  }
}
```

---

## 📂 Repo & Video

- **Repo:** https://github.com/Aseemakram19/hotstar-kubernetes  
- **Walkthrough Video:** https://youtu.be/VPJ4gesLXOc

---

## 🎥 Other DevOps Projects

- JAVA Application Deployment — https://www.youtube.com/watch?v=R98DHKqAEos  
- Bingo on Kubernetes + Monitoring — https://youtu.be/j6YxADVF0W8  
- Real-time CI/CD Website (Jenkins) — https://youtu.be/xGWx_cXb9DE  
- App Server via Terraform + Jenkins + SonarQube — https://youtu.be/xGWx_cXb9DE  
- Realtime Node.js + PM2 + Jenkins + SonarQube + SSL — https://youtu.be/MFtUCfQ1RX0

---

## 🤝 Connect

- **LinkedIn:** https://www.linkedin.com/in/mohammed-aseem-akram/

---

## 📜 License

Add your preferred license (MIT/Apache-2.0).

---

## 📎 Mini Markdown Cheatsheet (Headers, Bold, Italics, Required Labels)

```
# Header 1
## Header 2
### Header 3

**Bold text**
*Italic text*
***Bold + Italic***

**Label:** *value*            <- pattern for labels
**Required:** *<replace-me>*  <- pattern for required fields

`inline code`

```bash
# code block
echo "Hello"
```

[Link text](https://example.com)
![Alt text](https://path/to/image.png)
```
