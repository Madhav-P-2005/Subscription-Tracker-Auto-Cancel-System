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

## Architecture Details
- **`pages/Home.jsx`**: The fundamental layout shell controlling the application logic, orchestrating state between the top-level API requests and deep Component trees.
- **`services/api.js`**: Bridges the React ecosystem exclusively to our custom Python AI FastAPI server via parallel Axios execution.
- **`services/firebase.js`**: Initializes cloud dependencies. All verified ML subscription results are saved to Firebase enabling long-term persistence across user sessions.
- **`components/Upload.jsx`**: Embeds **Papaparse** to asynchronously process user-supplied CSV files locally on the machine before constructing API payloads.
- **`components/Insights.jsx` & `Alerts.jsx`**: Contextual visual containers evaluating raw subscription dictionaries to prompt real-time heuristics such as "You could save roughly ₹XX".
