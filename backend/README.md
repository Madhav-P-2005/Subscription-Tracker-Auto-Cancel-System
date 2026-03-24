# Smart Subscription Tracker - Backend Architecture

## Problem Statement
Detecting recurring subscriptions from a raw bank statement or CSV file is difficult because vendor names often have slight variations (e.g., "Netflix Subscription" vs "NETFLIX INC 10329"), making basic string matching ineffective. 

## What We Built
A unified, real-time Python service utilizing a hybrid **Machine Learning & Rule-Based algorithm** to actively digest financial payloads, group similar vendors securely, calculate their chronological billing frequencies, and identify hidden subscriptions.

## Tech Stack
* **Web Framework:** FastAPI with Uvicorn
* **Data Engineering:** Pandas
* **AI / Machine Learning:** Scikit-Learn (TF-IDF Vectorizer, Cosine Similarity)
* **SMS Integration:** Twilio
* **Data Validation:** Pydantic

## AI Integration Details
The core logic resides in `services/detection.py` and is fully automated without relying on mock data.

1. **Text Normalization:** `preprocessing.py` utilizes Pandas and regex to sanitize transaction names, lowercasing tokens and stripping financial noise phrases (like "txn", "pos", "card").
2. **Text Vectorization:** We utilize Scikit-Learn's `TfidfVectorizer` to convert text descriptions into multi-dimensional arrays, emphasizing unique words and ignoring common stopwords.
3. **Clustering via Cosine Similarity:** The backend computes a `cosine_similarity` matrix comparing every transaction to every other transaction. We dynamically link clusters using a threshold index of `> 0.75`.
4. **Time-Series Logic:** Once grouped, it analyzes the chronographical variance: 
    * Validates amount stability (standard deviation < 0.3 or ±10%).
    * Computes averages of time differences to classify recurrences perfectly into Weekly (~7 days), Monthly (~30 days), or Yearly (~365 days).

## Architecture Details
- **`main.py`**: Boots the ASGI server ensuring optimized async execution.
- **`routes/api.py`**: Exposes REST interfaces (`/analyze-transactions`, `/subscriptions`, `/cancel-subscription`). Handles Twilio and Brevo credentials to dispatch live SMS and Email alerts immediately upon cancellation.
- **`services/insights.py`**: Performs mathematical reductions projecting overall yearly/monthly analytics based on detected metadata.

## ⚙️ Environment Configuration
Create a `.env` file in the root of `/backend`:
```env
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=...
MY_MOBILE_NUMBER=...
BREVO_SMTP_KEY=...
BREVO_SENDER_EMAIL=...
```
