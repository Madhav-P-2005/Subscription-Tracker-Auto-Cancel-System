# Smart Subscription Tracker - Frontend Architecture

## Problem Statement
Users face "Subscription Fatigue", unknowingly leaking capital every month due to forgotten or unused recurring services. The application visually unifies transaction insights so users can analyze their capital drift accurately and take immediate cancellation actions.

## What We Built
A stunning, fully responsive FinTech Dashboard UI heavily inspired by premium financial services. It handles initial file uploading, ML analysis rendering, real-time cloud backup, and interactive tracking.

## Tech Stack
* **Framework:** React 19 (Vite)
* **Styling:** Tailwind CSS v4 (Leveraging native CSS @import semantics)
* **Design Pattern:** Glassmorphism overlay patterns on dark aesthetics.
* **Component Library:** Lucide React for modern iconography.
* **Charting Engine:** Recharts (Area charts for trend lines).
* **Database / Cloud:** Firebase Firestore (for immediate synchronization).

- **`pages/Home.jsx`**: The fundamental layout shell controlling the application logic and sidebar navigation.
- **`pages/ForgotPassword.jsx`**: Automated password recovery integration via Firebase.
- **`services/api.js`**: Bridges the React ecosystem exclusively to our custom Python AI FastAPI server via parallel Axios execution.
- **`services/firebase.js`**: Initializes cloud dependencies and Authentication listeners.
- **`components/Upload.jsx`**: Embeds **Papaparse** to asynchronously process user-supplied CSV files locally.
- **`components/Dashboard.jsx`**: High-performance visualization using Recharts for capital drift tracking.

## ⚙️ Setup
```bash
npm install
npm run dev
```
Ensure `src/services/firebase.js` is populated with your Firebase project keys.
