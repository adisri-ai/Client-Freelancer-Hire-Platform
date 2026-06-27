# 🚀 TalentStage — Creator & Freelancer Portfolio + Hiring Marketplace

🌐 **Live Demo:**
**[🔗 Project Live Link](https://*****-frontend.vercel.app/)**

> **⚠️ Note:** The login page may take some time to initialize because the backend is hosted on **Render Free Tier**, which spins down after periods of inactivity.

---

# 🏆 Problem Statement

## **TalentStage — Creator & Freelancer Portfolio + Hiring Marketplace**

### **Vision**

Build a marketplace where creative and technical freelancers (designers, developers, video editors, content writers, etc.) can:

* 🎨 Showcase their portfolios
* 🔍 Get discovered by clients
* 💼 Bid on projects
* 🤝 Collaborate seamlessly

AI assists **both freelancers and clients** in making smarter decisions throughout the hiring process.

---

# 🛠️ Tech Stack

| Component          | Technology                            |
| ------------------ | ------------------------------------- |
| 🎨 Frontend        | React.js                              |
| ⚙️ Backend         | FastAPI                               |
| 🤖 LLM Integration | Google Gemini API, Hugging Face, GROQ |
| 🗄️ Database       | MongoDB                               |
| ☁️ Deployment      | Backend – Render<br>Frontend – Vercel |

---

# 🚀 Local Deployment

## 1️⃣ Clone / Download the Project

Download the complete **Frontend** and **Backend** source code.

---

## 2️⃣ Configure Environment Variables

Inside the **Backend**, add the following environment variables:

```env
GOOGLE_GEMINI_API_KEY=
GROQ_API_KEY=
MONGO_URI=
HUGGINGFACEHUB_API_TOKEN=
```

---

## 3️⃣ Install Backend Dependencies

Navigate to the backend directory and run:

```bash
pip install -r requirements.txt
```

---

## 4️⃣ Start the Backend

Run the FastAPI server:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

You may replace **8000** with any available system port.

---

## 5️⃣ Configure the Frontend

Before starting:

* Ensure **Node.js** is installed.
* Ensure **React.js** is available.
* Configure the backend endpoint inside the frontend `.env` file.

---

## 6️⃣ Install Frontend Dependencies

```bash
npm run build
```

---

## 7️⃣ Start the Frontend

```bash
npm run dev
```

---

# 🤖 AI Features (Project Differentiator)

TalentStage goes beyond a traditional freelancing marketplace by integrating AI throughout the platform.

### 📝 1. Proposal Review

Before submitting a proposal, freelancers can use AI to analyze and improve its overall quality.

---

### 📄 2. Client-side Proposal Review

Clients can evaluate received proposals using AI-generated reviews and insights.

---

### 💡 3. Project Idea Formulation

Before publishing a project, clients can refine and reshape their ideas into more realistic and well-defined project descriptions using AI.

---

### 🎯 4. AI-Generated Skill Tests

Freelancers can verify their skills through dynamically generated AI-powered assessments.

Since questions are generated **during runtime**, they are not static, significantly reducing plagiarism and copying.

---

# 🔐 Sample Credentials

## 👨‍💻 Freelancer

**Email**

```text
free1@talentstage.com
```

**Password**

```text
freelancer1
```

---

## 👔 Client

**Email**

```text
cli1@talentstage.com
```

**Password**

```text
cli1cli1
```

---

# ⚠️ Limitations

### 1️⃣ Render Free Tier

The backend may take **approximately 2 minutes** to respond to the first request after inactivity.

---

### 2️⃣ Sandbox Payments

Payments are implemented using **virtual coins** provided by the platform rather than real payment methods (credit card, CVV, etc.).

---

### 3️⃣ Free LLM Models

The project uses **free LLM APIs**, which are subject to rate limits.

Excessive AI requests may occasionally result in failed AI responses.

---

# ⭐ Highlights

* 🎨 Portfolio Showcase
* 💼 Freelancer Marketplace
* 🤖 AI Proposal Review
* 📄 AI Client Proposal Analysis
* 💡 AI Project Idea Refinement
* 🎯 Dynamic AI Skill Tests
* ⚡ FastAPI Backend
* ⚛️ React Frontend
* ☁️ Render + Vercel Deployment
* 🗄️ MongoDB Database

---

## 💙 Thank you for checking out TalentStage!
