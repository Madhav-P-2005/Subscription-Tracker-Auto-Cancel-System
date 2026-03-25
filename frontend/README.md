<div align="center">
  
# 🎨 TrackMySub | Frontend UI & Presentation Layer

The visual, client-side interface of the **TrackMySub** architecture. This directory contains the **React 18 + Vite** Single Page Application (SPA). It is engineered using a deeply customized, dark-themed glassmorphism **Tailwind CSS** design system. 

It provides fluid micro-interactions, complex routing, and mathematically-driven realtime data visualizations to deliver an Enterprise-grade FinTech user experience.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34)](https://firebase.google.com/)

</div>

---

## 🏗️ Component Architecture
The frontend codebase is strictly modularized to maintain high scalability:

- **`/pages`**: Top-level route containers. Handles the overarching UI layout for the Authentication Flow (Login, Register, Forgot Password) and the deeply-nested Dashboard (Insights, Data Upload, Subscriptions List).
- **`/components`**: Reusable logic blocks. Contains perfectly encapsulated UI items like the `StatCard`, the algorithmic Spending Trajectory `AreaChart`, and the `SubscriptionCard` (which houses the interactive 1-click cancellation hooks).
- **`/services/api.js`**: An abstracted Axios routing layer. Handles asynchronous data fetching to the local Python FastAPI machine-learning server. Includes standard `.catch()` interceptors for pristine error handling.
- **`/services/firebase.js`**: The secure Google Cloud configuration. Binds the application natively to `auth` and `firestore` for strict state verification across devices.

---

## ✨ Key Features & UX (HackArena Highlights)

- **Liquid Micro-Animations:** Almost every macro action and routing transition relies on `framer-motion` to smoothly sequence stagger animations, hover states, and structural layout expansions. It feels *alive*.
- **Real-Time Data Filtering:** The "Manage Subscriptions" page is bound by React state management to instantly filter the AI-modeled array of contracts using case-insensitive text matching smoothly without server-side lag.
- **Dynamic Forecasting (Recharts):** The central dashboard's Spending Trajectory is entirely deterministic. It natively iterates over all `active` subscriptions, accurately calculates the difference between `Weekly`, `Monthly`, and `Yearly` billing vectors, and maps out a precisely calculated 6-month budget projection.
- **Omnipresent Feedback System:** Every user-initiated POST request (File Uploads, Cancellations, User Authentication) is hooked with `react-hot-toast` notifications. The application never leaves the user guessing about the network state.
- **Local CSV Exporter:** Leverages `papaparse` to instantly convert your deeply modeled structured AI data back into an easily-readable CSV file that automatically triggers a browser-level download Blob for offline archiving.

---

## ⚙️ Development Environment Setup

*(Required Node Environment: `v18+`)*

```bash
# 1. Install Node Package Modules
# Ensure you are inside the `/frontend` directory
npm install

# 2. Configure Firebase Environment Variables
# Map these values into /src/services/firebase.js if requested:
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_id

# 3. Boot the Vite Development Server
npm run dev

# The React application will instantly boot and serve hot-module-replacements on:
# http://localhost:5173
```
