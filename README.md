<div align="center">
  <img src="https://img.shields.io/badge/Domain-FinTech-3b82f6?style=for-the-badge&logo=appveyor"/>
  <img src="https://img.shields.io/badge/Status-Production%20Ready-10b981?style=for-the-badge"/>
  
  <br/>
  
  <h1>🚀 TrackMySub - AI Subscription Manager</h1>
  <p><b>Enterprise-Grade Infrastructure • Secure Data Processing • Intelligent Insights</b></p>
  
  <p>
    Built with ❤️ by <b>Team Hack Horizon</b><br/>
    <i>KLE's BCA P.C Jabins College, Hubballi</i>
  </p>

</div>

---

## 🌟 Overview

**TrackMySub** is a next-generation FinTech application designed to combat the "subscription economy" drain. By securely ingesting bank statement data, our proprietary Machine Learning pipeline (leveraging `scikit-learn` and `pandas`) clusters recurring transactions, identifies invisible active subscriptions, and allows users to simulate instant subscription cancellation via integrated SMS/Email workflows.

This is a **monorepo** containing both our React frontend and FastAPI Python backend.

---

## 👥 The Team: Hack Horizon

We are a group of passionate developers from **KLE's BCA P.C Jabins College, Hubballi**, dedicated to building impactful digital solutions.

| Role | Name | Links |
| :--- | :--- | :--- |
| **Full Stack Developer** | Madhav P | [GitHub](https://github.com/Madhav-P-2005) \| [Instagram](https://www.instagram.com/madhavp_14/) |
| **Developer** | Ramnath Bhat | - |
| **Developer** | Vinay G B | - |
| **Developer** | Mayur | - |

---

## ✨ Core Features

* **🛡️ Privacy-Centric Ingestion:** Stateless CSV ingestion via `Papaparse`. Bank data is modeled dynamically in-memory and completely destroyed post-analysis.
* **🧠 AI Pattern Detection:** TF-IDF Vectorization and Cosine Similarity cross-reference temporal metadata to detect hidden Weekly, Monthly, and Yearly recurring bills with absolute precision.
* **📊 Glassmorphic Dashboard:** Built with Framer Motion and Recharts, offering a seamless, interactive financial breakdown of your active burn-rate and yearly projection.
* **⚡ 1-Click Auto-Cancel Protocol:** Clicking "Cancel" on a subscription triggers our real-time notification engine, instantly dispatching a confirmation SMS via Twilio and a confirmation Email via Brevo.
* **🔒 Firebase Authentication:** Military-grade secure session management, persistent logins, and password recovery workflows via Google Firebase.

---

## 🛠️ Technology Stack

### Frontend Architecture
* **Framework:** React 19 (Vite)
* **Styling:** Tailwind CSS v4 + Framer Motion
* **Visuals:** Recharts (Data Viz) + React Icons (Fa/Hi)
* **State Management:** React Router DOM + Outlet Contexts
* **Auth & DB:** Firebase Authentication & Firestore Database

### Backend Architecture
* **Framework:** Python FastAPI + Uvicorn
* **AI/ML Engine:** Numpy, Pandas, Scikit-Learn
* **Communication APIs:** Twilio (SMS), Brevo (Email SMTP via requests)
* **Validation:** Pydantic Schemas

---

## 🚀 Local Development Guide

Want to run TrackMySub on your own machine? It requires exactly two terminals.

### 1. Setup the Backend (Terminal 1)
Navigate into the backend directory and install the Python dependencies.
```bash
cd backend
python -m venv venv
source venv/Scripts/activate  # On Windows
pip install -r requirements.txt
```
Copy your credentials into `backend/.env`:
* `TWILIO_ACCOUNT_SID` & `TWILIO_AUTH_TOKEN` & `TWILIO_PHONE_NUMBER`
* `MY_MOBILE_NUMBER` (For testing SMS)
* `BREVO_SMTP_KEY`

Run the server:
```bash
uvicorn main:app --reload
```

### 2. Setup the Frontend (Terminal 2)
Navigate to the frontend directory and install Node dependencies.
```bash
cd frontend
npm install
```
Setup your Firebase credentials in `frontend/src/services/firebase.js`.

Start the Vite development server:
```bash
npm run dev
```

---

<div align="center">
  <p><b>Engineered for Hackathon 2026 • Real World Solutions</b></p>
</div>
