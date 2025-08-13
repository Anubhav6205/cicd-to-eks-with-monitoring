# 🚀 End-to-End DevOps: CI/CD → EKS → Observability

> **Build → Scan → Quality Gate → Containerize → Push → Deploy → Probe → Visualize**

This project showcases a complete **DevOps pipeline** that deploys a **Hotstar website clone** to **Amazon EKS (Kubernetes)**, secures builds with **SonarQube + OWASP Dependency-Check + Trivy**, and monitors user-visible uptime with **Prometheus + Blackbox Exporter + Grafana**. Infra for monitoring is provisioned with **Terraform**. Notifications are sent via **Gmail SMTP**.

## 🏗 Architecture
<img width="10765" height="5267" alt="Architecture diagram" src="https://github.com/user-attachments/assets/773a93c7-f51a-4d3c-848d-f36a82e5ff1a" />

**Flow:**
1. Developer pushes code to GitHub.
2. Jenkins pipeline:
   - Builds application.
   - Runs code quality & security scans.
   - Builds & pushes Docker image.
   - Deploys to EKS.
3. Terraform provisions a monitoring EC2 instance.
4. Prometheus with Blackbox Exporter probes application uptime.
5. Grafana visualizes metrics & uptime status.

---

## 🧰 Tech Stack
- **Version Control:** GitHub  
- **CI/CD:** Jenkins  
- **Quality & Security:** SonarQube, OWASP Dependency-Check, Trivy  
- **Containerization:** Docker  
- **Orchestration:** Amazon EKS (Kubernetes)  
- **IaC:** Terraform (Monitoring Infrastructure)  
- **Monitoring:** Prometheus + Blackbox Exporter + Grafana  
- **Notifications:** Email via Gmail SMTP  

---

## ⚙️ Key Features
- **Automated Build & Deployment:** Push to main branch triggers full pipeline.  
- **Security & Quality Gates:** Builds fail if quality or vulnerability thresholds are not met.  
- **Immutable Deployments:** Docker images tagged with commit hashes.  
- **Uptime Monitoring:** Blackbox Exporter TCP, HTTP, and POST probes.  
- **Custom Dashboards:** Grafana connected to Prometheus.  
- **Infrastructure Automation:** Terraform-managed monitoring server.  

---

## 📊 Monitoring – Blackbox Exporter Modules
- **http_2xx** → Checks for HTTP 200 OK responses.  
- **tcp_connect** → Validates TCP connectivity to services.  
- **http_post_2xx** → Tests POST endpoints for success responses.  

*Note:*  
`http://` and `https://` are URL schemes, not part of the hostname.  
DNS and raw TCP work only with host and port.

---

## 🚀 How It Works
1. **Code Commit → Jenkins Build**
2. **Scans → Docker Image → Push to Registry**
3. **Deploy to EKS via kubectl**
4. **Terraform → Monitoring Server**
5. **Prometheus + Blackbox → Probe EKS Service**
6. **Grafana → Visualize Metrics**

---

## 📌 Outcomes
- Fully automated CI/CD with built-in quality and security checks.  
- Scalable deployment on AWS EKS.  
- Live uptime monitoring with visual dashboards.  

---

## 📜 License
This project is for educational and demonstration purposes.
