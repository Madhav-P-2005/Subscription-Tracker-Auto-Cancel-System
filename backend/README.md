<div align="center">
  
# ⚙️ TrackMySub | Backend & ML Engine

The central nervous system of the **TrackMySub** architecture. This directory holds the asynchronous **FastAPI** web server and the strictly localized **NLP/Machine Learning algorithms** that parse, vectorize, and heuristically extract hidden recurring subscriptions from noisy banking data. 

[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=for-the-badge&logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)
[![Pandas](https://img.shields.io/badge/pandas-%23150458.svg?style=for-the-badge&logo=pandas&logoColor=white)](https://pandas.pydata.org/)
[![Twilio](https://img.shields.io/badge/Twilio-F22F46?style=for-the-badge&logo=Twilio&logoColor=white)](https://www.twilio.com/)

</div>

---

## 🏗️ Backend System Architecture

1. **`main.py`**: The FastAPI application entrypoint. Configures CORS, mounts the routing module, and initializes the high-performance HTTP ASGI listener.
2. **`routes/api.py`**: The API Gateway holding the core endpoints (`/analyze-transactions`, `/cancel-subscription`). Functions as the bridge between the React frontend UI state and the backend AI data models.
3. **`services/preprocessing.py`**: Automated Data Scrubbing. Uses complex regular expressions and string manipulation to instantly strip numerical variance, random timestamps, and financial special characters from unorganized Bank Statement CSVs.
4. **`services/detection.py`**: The physical Machine Learning brain. It executes **TF-IDF Vectorization** and **Cosine Similarity Matrixing** to mathematically group identical vendors logic. It then applies statistical standard deviation on billing dates to extract exact recurrence periods.
5. **`services/insights.py`**: Provides mathematical aggregations across the modeled data predicting structural "Burn Rate" and net savings after hypothetical cancellations.
6. **`twilio_client.py` & `brevo_client.py`**: Synchronous webhook modules mapping the Python cancellation hooks to physical real-world **SMS Dispatches** and **SMTP Emails**.

---

## 🚀 Primary API Endpoints

### 1. `POST /api/analyze-transactions`
The foundational trigger connecting the user's raw bank data to the AI.
- **Accepts:** Target file upload (`multipart/form-data`) representing standard banking CSVs.
- **Engine Process:** The CSV is pushed via a `StringIO` memory buffer into `preprocessing.py` then straight into `detection.py`. The machine learning isolates clusters and outputs a structural dictionary.
- **Returns:** Fully realized JSON payload mapping every recognized subscription, deeply typed with fields such as `amount`, `next_billing_date`, and calculated `frequency` (Weekly, Monthly, Yearly).

### 2. `POST /api/cancel-subscription`
The 1-Click Operational hook that the frontend utilizes to terminate digital contracts.
- **Accepts:** Standard JSON Request referencing a strictly typed `subscription_id` and formatted `subscription_name`.
- **Engine Process:** Intercepts the request and mathematically alters the hypothetical state of the User's budget projection to "CANCELLED". Immediately after, it invokes the **Twilio SDK** and **Brevo REST API** to blast physical confirmation of the action to the user's mobile device and inbox.
- **Returns:** HTTP 200 Success + "Webhook Dispatch Confirmed".

---

## 🧬 Machine Learning Pipeline (HackArena Deep-Dive)
To ensure production-grade accuracy for the hackathon presentation, we purposefully skipped brittle string-matching (which fails against ever-changing bank formats) and built mathematical certainty:

- **`TfidfVectorizer` (Scikit-Learn):** By calculating Term Frequency-Inverse Document Frequency, the AI automatically down-weights completely useless, high-frequency banking terms like "POS", "CARD", "VISA", or "DEBIT", and artificially amplifies the mathematical density of the actual corporate entity naming (e.g. "NETFLIX", "SPOTIFY").
- **Multi-Dimensional Cosine Similarity:** Once the text is an array of floating-point mathematics, we identify identical entity clusters by checking the exact angle between their matrix vectors. A cosine score exceeding our strict internal threshold triggers standard clustering logic.
- **Standard Deviation Temporal Detection:** To ensure repeated ad-hoc purchases (e.g., getting a coffee at Starbucks every Tuesday) aren't flagged as subscriptions, the AI scans grouped transactions for their "Date Deltas". If the variance between these purchases fluctuates wildly over the interval, it kills the classification, effectively ensuring near-zero false positive subscription matches.

---

## ⚙️ Development Environment Setup

*(Required Python Version: `^3.8`)*

```bash
# 1. Initialize Virtual Environment (Keeps dependencies isolated)
python -m venv venv

# 2. Activate Virtual Environment
# Windows Systems:
venv\Scripts\activate
# Mac/UNIX Systems:
source venv/bin/activate

# 3. Inject Core Dependencies
pip install -r requirements.txt

# 4. Configure Secret Environment Integrations
# Create a .env file locally directly in the root of the backend folder:
TWILIO_ACCOUNT_SID=your_credential_here
TWILIO_AUTH_TOKEN=your_token_here
TWILIO_PHONE_NUMBER=+1234567890
MY_PHONE_NUMBER=+10987654321
BREVO_API_KEY=your_brevo_key_here

# 5. Boot the ASGI Server Engine
uvicorn main:app --reload

# Fast API will expose the environment on http://localhost:8000
# Automatic generated OpenAPI/Swagger UI Documentation mounts on http://localhost:8000/docs
```
