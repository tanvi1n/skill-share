# SkillShare — A Study of Practical DevOps Practices

## 📌 Project Overview

**SkillShare** is a simple web application developed as a **learning and research project** to study how DevOps practices can be applied to the software development lifecycle.

The application allows users to share skills they possess and discover skills shared by other users. The application itself is intentionally kept simple so that the primary focus of the project remains on understanding and implementing DevOps practices such as **version control, continuous integration, automated testing, containerization, and cloud deployment**.

The project explores how a basic application evolves from a locally developed program into a containerized application that can be automatically built, tested, and deployed.

---

## 🎯 Objectives

The main objectives of this project are:

* To understand the role of Git and GitHub in source code management.
* To understand how continuous integration can automate software builds and testing.
* To learn how Docker can package an application and its dependencies into a reproducible environment.
* To understand how automated testing can be integrated into a CI pipeline.
* To deploy a containerized application on cloud infrastructure using AWS EC2.
* To study the advantages and limitations introduced by each DevOps practice.
* To understand which DevOps tools are useful for a small application and avoid introducing tools without a practical purpose.

---

## 🔬 Research / Learning Question

The project is centered around the following question:

> **How does the introduction of selected DevOps practices affect the development, testing, and deployment workflow of a small web application?**

Rather than attempting to use every available DevOps tool, the project focuses on tools that provide a clear and demonstrable purpose within the application's lifecycle.

---

## 🏗️ Application Overview

SkillShare provides a minimal platform where users can:

* View available skills.
* Search for a particular skill.
* Share a skill they know.
* Specify their proficiency level.

The application contains a simple frontend and a Spring Boot backend exposing REST APIs.

### Example APIs

| Method | Endpoint                   | Purpose                   |
| ------ | -------------------------- | ------------------------- |
| GET    | `/skills`                  | Retrieve available skills |
| POST   | `/skills`                  | Add a new skill           |
| GET    | `/skills/search?name=Java` | Search for a skill        |

The application intentionally uses a simple data model so that the project can focus on the DevOps workflow rather than database or application complexity.

---

# 🛠️ Technology Stack

### Application

* Java
* Spring Boot
* HTML
* CSS
* JavaScript

### DevOps

* Git
* GitHub
* Jenkins
* Docker
* AWS EC2

### Testing

* Spring Boot Test
* JUnit

---

# 🔄 DevOps Workflow

The overall workflow is:

```text
                    Developer
                        │
                        ▼
                  Git / GitHub
                        │
                        ▼
                    Jenkins
                        │
                ┌───────┴───────┐
                ▼               ▼
              Build           Test
                │               │
                └───────┬───────┘
                        │
                        ▼
                     Docker
                        │
                  Docker Image
                        │
                        ▼
                    AWS EC2
                        │
                        ▼
                 Docker Container
                        │
                        ▼
                   SkillShare
```

---

# 🔧 Role of Each Technology

## Git & GitHub

Git is used for version control and GitHub is used as the central repository for the project.

It allows the team to:

* Track changes.
* Maintain project history.
* Collaborate on source code.
* Create branches.
* Integrate changes.

---

## Jenkins

Jenkins is used to automate the continuous integration workflow.

Instead of manually performing the build and test process after every change, Jenkins performs these steps automatically.

The pipeline includes:

```text
Checkout
   ↓
Build
   ↓
Test
   ↓
Docker Build
```

This allows problems to be detected earlier in the development process.

---

## Docker

Docker is used to package the SkillShare application and its runtime environment into a container.

Without containerization, the application may depend on the configuration of the machine on which it is being executed.

Docker provides a more consistent execution environment.

Example:

```bash
docker build -t skillshare .
docker run -p 8080:8080 skillshare
```

---

## AWS EC2

AWS EC2 provides the cloud computing environment on which the containerized application is deployed.

The deployment architecture is:

```text
AWS EC2
   │
   └── Docker
         │
         └── SkillShare Container
```

This allows the application to be accessed remotely rather than only from the development machine.

---

## Automated Testing

Spring Boot Test and JUnit are used to verify the application's REST APIs.

Example tests include:

* Retrieving skills successfully.
* Adding a new skill.
* Searching for a skill.
* Validating invalid input.

These tests are integrated into the Jenkins pipeline so that a failed test can prevent the pipeline from proceeding.

---

# 🧪 Experimental Approach

The project is developed progressively to observe the effect of introducing different DevOps practices.

### Stage 1 — Local Development

```text
Source Code
     ↓
Run Application Locally
```

The application is initially developed and tested on the developer's machine.

### Stage 2 — Version Control

```text
Source Code
     ↓
Git
     ↓
GitHub
```

Source code changes become trackable and collaborative.

### Stage 3 — Automated Testing

```text
Application
     ↓
Automated Tests
```

Tests are created to verify application functionality.

### Stage 4 — Continuous Integration

```text
GitHub
   ↓
Jenkins
   ↓
Build
   ↓
Test
```

Jenkins automates the build and testing process.

### Stage 5 — Containerization

```text
Application
     ↓
Docker Image
     ↓
Docker Container
```

The application is packaged into a reproducible environment.

### Stage 6 — Cloud Deployment

```text
Docker Container
       ↓
AWS EC2
       ↓
Running Application
```

The containerized application is deployed to cloud infrastructure.

---

# 📊 Observations

The project evaluates the workflow before and after introducing each DevOps practice.

| Stage             | Observation                                                |
| ----------------- | ---------------------------------------------------------- |
| Local development | Build and execution are manually controlled                |
| Git/GitHub        | Changes become versioned and shareable                     |
| Automated testing | Functional problems can be detected automatically          |
| Jenkins           | Build and test steps become repeatable                     |
| Docker            | Application environment becomes more consistent            |
| AWS EC2           | Application can be deployed to remote cloud infrastructure |

These observations form the primary learning outcome of the project.

---

# 📁 Project Structure

```text
SkillShare/
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── ...
│   │   └── resources/
│   │       └── ...
│   │
│   └── test/
│       └── java/
│           └── ...
│
├── Dockerfile
├── Jenkinsfile
├── pom.xml
├── README.md
└── .gitignore
```

---

# 🚀 Running the Application Locally

## Prerequisites

Install:

* Java
* Maven
* Git
* Docker

Clone the repository:

```bash
git clone <repository-url>
cd SkillShare
```

Build the application:

```bash
mvn clean package
```

Run the application:

```bash
mvn spring-boot:run
```

The application will be available at:

```text
http://localhost:8080
```

---

# 🐳 Running with Docker

Build the Docker image:

```bash
docker build -t skillshare .
```

Run the container:

```bash
docker run -p 8080:8080 skillshare
```

The application can then be accessed at:

```text
http://localhost:8080
```

Check running containers:

```bash
docker ps
```

View container logs:

```bash
docker logs <container-id>
```

---

# 🔄 Jenkins Pipeline

The Jenkins pipeline automates the following process:

```text
GitHub
   ↓
Checkout
   ↓
Maven Build
   ↓
Automated Tests
   ↓
Docker Image Build
   ↓
Deployment
```

The pipeline is defined in:

```text
Jenkinsfile
```

---

# ☁️ AWS Deployment

The Dockerized application is deployed to an AWS EC2 instance.

The deployment process is:

```text
Developer
    ↓
GitHub
    ↓
Jenkins
    ↓
Docker Image
    ↓
AWS EC2
    ↓
Docker Container
```

The EC2 security configuration allows traffic to the port used by the application.

---

# 🔐 Security Considerations

Sensitive information should not be committed to the Git repository.

The following should be excluded from version control:

```text
.env
AWS credentials
Private keys
Passwords
API keys
```

The `.gitignore` file is used to prevent accidental commits of sensitive or unnecessary files.

---

# 📚 Why These Tools Were Selected

The project intentionally does **not** attempt to use every available DevOps technology.

Each selected technology addresses a specific requirement:

```text
Git/GitHub → Version control
Jenkins    → Continuous integration
Testing    → Automated verification
Docker     → Containerization
AWS EC2    → Cloud deployment
```

Technologies such as Kubernetes, Terraform, Ansible, monitoring platforms, and static-analysis platforms are not included in the initial implementation because they introduce additional complexity that is not required for the current application and research objectives.

They may be explored as future extensions if the application grows in scale or deployment complexity.

---

# 🔮 Future Scope

Possible extensions include:

* Database integration.
* Multiple independently deployable services.
* Kubernetes-based container orchestration.
* Infrastructure as Code using Terraform.
* Automated security scanning.
* Application monitoring.
* Load balancing and horizontal scaling.
* More comprehensive API testing using Karate.

These extensions would be evaluated based on their practical usefulness rather than being added solely to increase the number of tools used.

---

# 👥 Team Contributions

| Team Member | Primary Responsibility                                         |
| ----------- | -------------------------------------------------------------- |
| Member 1    | Git/GitHub, Docker, Jenkins, AWS deployment, CI/CD integration |
| Member 2    | Spring Boot backend and REST APIs                              |
| Member 3    | Frontend, automated testing, documentation                     |

All members contribute to understanding the overall DevOps workflow and participate in testing and presentation.

---

# 🎓 Learning Outcomes

Through this project, we aim to understand:

1. How source code is managed using Git and GitHub.
2. How automated testing can be integrated into development.
3. How Jenkins implements a continuous integration pipeline.
4. How Docker packages applications into portable containers.
5. How containers can be deployed on cloud infrastructure.
6. How different DevOps practices interact throughout the software development lifecycle.
7. How to select DevOps tools based on actual project requirements rather than using tools without a practical purpose.

---

## 📌 Conclusion

SkillShare serves as a small and controlled application through which different DevOps practices can be studied independently and then combined into a complete workflow.

The project demonstrates that DevOps is not simply the use of a collection of tools. Instead, each tool is introduced to address a specific stage of the software lifecycle:

```text
Develop
   ↓
Version
   ↓
Test
   ↓
Integrate
   ↓
Containerize
   ↓
Deploy
```

The primary outcome of the project is therefore not the SkillShare application itself, but the **understanding of how development, testing, and deployment can be automated and made more consistent using appropriate DevOps practices.**
