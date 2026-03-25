<div align="center">
  
# 🚀 TrackMySub | HackArena 2026 
**Autonomous FinTech Subscription Tracker & Auto-Cancel System**

*Proudly developed by **Team Hack Horizon** for HackArena 2026*

[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=for-the-badge&logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)
[![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34)](https://firebase.google.com/)

[**Problem Statement**](#-the-problem) • [**Machine Learning Engine**](#-how-our-aiml-predicts-subscriptions) • [**Features**](#-key-features) • [**Tech Stack**](#-tech-stack) • [**Setup**](#-local-development-setup)

</div>

---

## 📌 The Problem
Consumers today are drowning in the "Subscription Economy". Between OTT platforms, SaaS apps, and digital services, users frequently forget recurring charges, leading to massive unnecessary expenses. **Ghost subscriptions** quietly drain bank accounts.

## 💡 Our Solution
**TrackMySub** is an AI-powered financial dashboard that connects to your bank transaction history (via CSV exports), autonomously detects hidden recurring payments, aggregates them into a highly intuitive dashboard, and provides a simulated 1-click **"Auto-Cancel"** feature to protect your wallet.

---

## 🧠 How Our AI/ML Predicts Subscriptions 
We don't rely on hardcoded keyword matching. Financial transaction data is famously messy and unstructured (e.g., `POS*NETFLIX INC`, `NF* NETFLIX`, `Netflix`). 

We built a custom Machine Learning pipeline using `scikit-learn` inside our FastAPI engine to process transactions with **high accuracy**:

### 1. Text Standardization & NLP (`preprocessing.py`)
- We strip out numerical noise, special characters, and datestamps using regular expressions.
- We run the cleaned merchant strings through a **`TfidfVectorizer` (Term Frequency-Inverse Document Frequency)**. This algorithm evaluates the statistical importance of words across all your transactions, neutralizing generic words like "POS" or "DEBIT" and highlighting the actual merchant names.

### 2. Entity Clustering (`cosine_similarity`)
- Once the merchants are converted into mathematical vectors, we use **Cosine Similarity** to group them. This measures the angle between vectors (not magnitude) to detect that `AMZN*PRIME` and `Amazon Prime Video` are identical entities, effectively clustering recurring payments even if their billing descriptions slightly change layer to month.

### 3. Heuristic Frequency Detection (`detection.py`)
- For every clustered merchant, our engine extracts an array of billing dates.
- We calculate the **Date Delta (Time Gap)** between consecutive payments.
- By calculating the statistical variance of these gaps, the system intelligently categorizes the subscription frequency as:
  - **Weekly:** (~7 day delta)
  - **Monthly:** (~28-31 day delta)
  - **Yearly:** (~365 day delta)
- If the variance is extremely high and sporadic, the AI correctly ignores the transaction as a "one-off" purchase rather than a subscription.

---

## ✨ Key Features
- **🤖 Autonomous ML Detection:** Upload raw CSV bank statements; watch the AI instantly extract your active subscription plans.
- **📊 Algorithmic Spending Trajectory:** Real-time dynamic charts projecting your 6-month financial burn rate mathematically based on detected monthly/yearly billing cycles.
- **🔔 Proactive Renewal Alerts:** Advanced filtering triggers notifications and a glowing dashboard bell 30 days prior to a billing spike.
- **🛡️ 1-Click Simulation Cancellation:** Experience the management flow. Instantly simulate canceling a subscription, which triggers success pipelines while securely updating your projected savings.
- **✉️ Real-Time Communication API:** Integrated with **Twilio (SMS)** and **Brevo (Email)**. Upon detecting threats or executing cancellations, users get immediate real-world pings to their devices!
- **🔐 Secure Architecture:** Full Firebase Authentication flow (Login, Sign-up, Forgot Password) natively generating JWTs. 

---

## 💻 Tech Stack

### Frontend (User Interface & Experience)
- **Framework:** React.js (via Vite)
- **Styling:** Tailwind CSS + Framer Motion (for liquid-smooth micro-animations)
- **Data Visualization:** Recharts
- **State Feedback:** React Hot Toast
- **Hosting / DB:** Firebase Auth & Firestore

### Backend (AI Engine & Processing)
- **Core:** FastAPI (Asynchronous Python Framework)
- **Data Science / ML:** Pandas, Scikit-Learn (`TfidfVectorizer`, `cosine_similarity`)
- **Parsers:** Python `python-multipart` & `io.StringIO`
- **External Integration:** Twilio SDK (SMS), Brevo API (Email Automation)

---

## 👨‍💻 Team Hack Horizon
Proudly representing **KLE's BCA P.C Jabins College, Hubballi**
- **Madhav P**
- **Ramnath Bhat**
- **Vinay G B**
- **Mayur**

---

## 🛠️ Local Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/HackHorizon/Auto-Cancel-System.git
cd Auto-Cancel-System
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
```
**Environment Variables (`backend/.env`):**
Create an `.env` file and supply:
```
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=your_number
MY_PHONE_NUMBER=destination_number
BREVO_API_KEY=your_key
```
**Start the AI Server:**
```bash
uvicorn main:app --reload
# Runs on http://localhost:8000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```
*Note: Ensure your Firebase configuration settings are properly injected into `src/services/firebase.js`.*

---
<div align="center">
<b>Built for HackArena 2026. Data-driven decisions. Absolute privacy. No more ghost subscriptions.</b>
</div>
