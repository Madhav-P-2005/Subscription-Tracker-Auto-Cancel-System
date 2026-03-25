<div align="center">

# 🚀 TrackMySub | HackArena 2026 Submission

**Autonomous FinTech Subscription Tracker & Auto-Cancel System**

*Proudly developed by **Team Hack Horizon** for HackArena 2026*

[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=for-the-badge&logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)
[![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34)](https://firebase.google.com/)

[**Architecture**](#-system-architecture) • [**How to Test**](#-how-to-test-the-full-flow-guide-for-judges) • [**Machine Learning Engine**](#-how-our-aiml-engine-works) • [**Tech Stack**](#-tech-stack)

</div>

---

## 📌 The Problem

Consumers today are drowning in the "Subscription Economy". Between OTT platforms, SaaS apps, and digital services, users frequently forget recurring charges, leading to massive unnecessary expenses. **Ghost subscriptions** quietly drain bank accounts because traditional transaction histories are too noisy to read manually.

## 💡 Our Solution

**TrackMySub** is an AI-powered financial dashboard that connects to your bank transaction history (via CSV exports), autonomously detects hidden recurring payments, aggregates them into a highly intuitive dashboard, and provides a simulated 1-click **"Auto-Cancel"** feature to protect your wallet.

---

## 🏗️ System Architecture

TrackMySub is engineered using a decoupled, production-grade microservices architecture:

1. **Client UI Layer (React/Vite):** Highly dynamic, glassmorphism UI utilizing React Router, Framer Motion for micro-animations, and dynamic data binding. It natively handles Firebase Auth flow (Login, Sign-up, Password Recovery) and utilizes React Hot Toast to give users instant visual confirmation for **every single action macro**.
2. **API & Processing Gateway (FastAPI):** Python asynchronous server acting as the central router. It securely catches multi-part form payloads (raw CSVs) and routes them into the Data Science pipelines.
3. **Natural Language Processing Engine:** A strictly localized Machine Learning pipeline using pandas, regex, and scikit-learn. It executes advanced TF-IDF math to categorize and detect behavioral patterns.
4. **External Infrastructure:**
   - **Firebase Firestore:** Cloud synchronization for modeled subscriptions and user states.
   - **Twilio Cloud & Brevo API:** Real-world webhook listeners that dispatch live SMS texts and SMTP operational Emails instantly when a user simulates canceling a digital contract.

---

## 🎮 How to Test the Full Flow (Guide for Judges)

Want to experience the end-to-end functionality of TrackMySub? Follow these exact steps:

### Step 1: Initialize an Account

1. Open the landing page and click **"Create Free Account"**.
2. Walk through the Secure Sign-Up flow (test the validation: try a weak password, or duplicate email—the UI will catch it!).
3. Upon success, you will instantly be routed into the main operating terminal (the Dashboard).

### Step 2: Upload Raw Bank Data & Engage the AI

1. Navigate to the **"Analyze Data"** tab via the sidebar.
2. Upload a standard Bank Statement `.csv` (Needs typical columns like `Date`, `Description`, `Debit Amount`).
3. *Notice the UX:* The table will instantly render and preview all the messy, unfiltered raw data.
4. Hit **"Run Subscription AI"**.
5. *What's happening?* Your messy CSV is sent to the FastAPI backend. Our ML engine applies NLP vectorization, strips the noise, mathematically groups identical merchants together using Cosine Similarity, and uses a Date Delta algorithm to determine if the intervals represent a Weekly, Monthly, or Yearly plan. It then calculates the *Exact Next Billing Date*.

### Step 3: Explore the Modeled Dashboard Insights

1. Go back to the **"Dashboard"**.
2. **Real-Time Forecasting:** Notice the beautiful Spending Trajectory area chart. That is *not mock data*. It iteratively extracts mathematical future costs based on the active parsed plans.
3. **Actionable Alerts:** Check the Notification Bell on the top nav. If the AI detected any subscriptions renewing in the next 30 days, the bell will glow. Click the bell to trigger an actionable toast routing you to the alerts sector.
4. **CSV Exporting:** Go to the Subscriptions tab and hit **Export** to securely download your freshly cleaned, machine-readable subscription database locally.

### Step 4: Simulate an Auto-Cancellation (The Magic Trick)

1. Go to **"Subscriptions"** or your **"Dashboard"**.
2. Find an expensive active plan (like Netflix or a Gym Membership).
3. Click "Manage", and then click the **"Cancel Subscription"** simulation button.
4. The system updates the entity state to "CANCELLED", shuts off the delete button, and removes it from your future burn rate.
5. **Check your configured Phone / Email!** The backend instantly triggers the Twilio and Brevo pipelines. You will receive a live, real-world SMS and Email confirming that TrackMySub has effectively terminated the contract.

---

## 🧠 How Our AI/ML Engine Works (The Secret Sauce)

Traditional regex keyword mapping fails in FinTech. "POS*NETFLIX INC", "NF* NETFLIX", and "Netflix Subscription" are all the same entity. Here is how our model perfectly links them:

### 1. NLP Vectorization (`TfidfVectorizer`)

We strip numerical noise, timestamps, and special characters, leaving base string data. Then, we funnel these strings into a **Term Frequency-Inverse Document Frequency (TF-IDF)** module. This algorithm assigns heavy mathematical weight to unique identifiers ("Netflix") while stripping away zero-value noise words ("POS", "DEBIT", "VISA").

### 2. Entity Clustering (`cosine_similarity`)

Once strings are flattened into matrices, we calculate the angle (Cosine Similarity) between them. If two transaction descriptions match geographically in vector space above a precise threshold, they are automatically clustered as the same vendor.

### 3. Heuristic Frequency Profiling (`Date Delta Analysis`)

For every clustered vendor, we extract an array of historical billing dates. We calculate the `Delta` (time gap in days) between each consecutive payment. By running a **Variance Standard Deviation** logic layer, the AI flags the transaction as:

- **Weekly:** Consistent delta around 7 days.
- **Monthly:** Consistent delta around 25-31 days.
- **Yearly:** Delta around 365 days.

If the variance is wildly sporadic, the AI correctly identifies that this is just a frequent coffee shop visit, *not* a recurring subscription, avoiding false positives.

---

## 💻 Tech Stack Overview

- **Frontend Application:** React 18, Vite JS, Tailwind CSS, Framer Motion, Recharts, React Hot Toast, Lucide/Hero-icons.
- **Backend & ML Engine:** Python 3, FastAPI, Pandas, Scikit-Learn.
- **Database & Cloud:** Firebase Authentication, Cloud Firestore.
- **3rd Party Integration:** Twilio (SMS Engine), Brevo (SMTP/Email Engine).

---

## 👨‍💻 Team Hack Horizon

Built specifically for **HackArena 2026** by KLE's BCA P.C Jabins College, Hubballi.

- **Madhav P** (Developer / Architect)
- **Ramnath Bhat** (Developer)
- **Vinay G B** (Developer)
- **Mayur** (Developer)

---

## ⚙️ Local Development Setup

### 1. Clone the Source

```bash
git clone https://github.com/HackHorizon/Auto-Cancel-System.git
cd Auto-Cancel-System
```

### 2. Backend Initialization (Python Server)

```bash
cd backend
python -m venv venv

# Windows Start:
venv\Scripts\activate
# Mac/UNIX Start:
source venv/bin/activate

pip install -r requirements.txt
```

**Environment Variables (`backend/.env`):**
Create an `.env` and fill out your specific credentials:

```
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=your_number
MY_PHONE_NUMBER=destination_number
BREVO_API_KEY=your_key
```

**Start the Fast API Engine:**

```bash
uvicorn main:app --reload
# Automatically boots on http://localhost:8000
```

### 3. Frontend Initialization (React / Node)

```bash
cd frontend
npm install
npm run dev
# Booting up the interface on http://localhost:5173
```

*Note: Make sure to map your Firebase web application keys into `src/services/firebase.js`.*

---

<div align="center">
<b>Data-driven decisions. Absolute privacy. TrackMySub.</b>
</div>
