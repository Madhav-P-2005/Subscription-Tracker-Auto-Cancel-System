# 🛡️ TrackMySub AI: Smart Subscription & Auto-Cancel System

### **"Master Your Cashflow, Eliminate Subscription Fatigue."**
TrackMySub AI is a high-performance FinTech platform designed to automatically detect, track, and manage recurring subscriptions using AI-driven analysis. From a simple CSV upload, our system identifies hidden billing cycles and provides one-click cancellation with real-time SMS and Email alerts.

---

## 🌟 Key Features

- **🤖 AI Detection Engine**: Uses TF-IDF and Cosine Similarity to cluster transactions and identify Weekly, Monthly, and Yearly recurrences.
- **📊 Interactive Dashboard**: Stunning visual trends, spending metrics, and automated savings calculations.
- **⚡ One-Click Cancellation**: Prototype integration that triggers immediate multi-channel notifications.
- **📲 Dual-Channel Alerts**: Real-time SMS (Twilio) and Email (Brevo) confirmation for every cancellation.
- **🔒 Professional Auth**: Secure Firebase Authentication with Password Recovery (Forgot Password) and "Remember Me" features.
- **📱 Multi-Page Architecture**: Fluid navigation between Dashboard, Subscriptions, AI Analyze, and Insights.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS v4, Framer Motion |
| **Backend** | Python 3.13, FastAPI, Pandas, Scikit-learn |
| **Database** | Firebase Firestore |
| **Auth** | Firebase Authentication |
| **Notifications** | Twilio (SMS), Brevo (Email) |
| **Visualization** | Recharts (Area & Bar Charts) |

---

## 📁 Project Structure

```bash
Subscription Tracker - AI/
├── frontend/             # React SPA (Vite + Tailwind)
│   ├── src/components/   # Reusable UI components
│   ├── src/pages/        # Routed views (Dashboard, Analyze, etc)
│   └── src/services/     # Firebase & API integration
├── backend/              # FastAPI Server (Python)
│   ├── routes/           # REST Endpoints
│   ├── services/         # ML Detection & Preprocessing logic
│   └── models/           # Pydantic Schemas
└── sample_data/          # Demo CSV files for testing
```

---

## 🚀 Getting Started

### 1. Backend Setup
```bash
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
*Note: Ensure `.env` is configured with Twilio and Brevo credentials.*

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 📜 Documentation Links

- [Backend Deep Dive](./backend/README.md) - Learn about the ML Detection algorithm.
- [Frontend Architecture](./frontend/README.md) - Modern UI patterns and state management.

---

### **Hackarena 2026 Submission**
Created with ❤️ by **Madhav P**
