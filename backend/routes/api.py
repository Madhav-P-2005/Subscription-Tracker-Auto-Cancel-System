import os, requests
from fastapi import APIRouter, HTTPException
from typing import List, Dict
from dotenv import load_dotenv
from twilio.rest import Client

from models.schemas import AnalyzeRequest, AnalyzeResponse, CancelRequest, SubscriptionItem
from services.preprocessing import clean_transactions
from services.detection import detect_subscriptions
from services.insights import generate_insights

load_dotenv()

TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")
MY_MOBILE_NUMBER = os.getenv("MY_MOBILE_NUMBER")
BREVO_API_KEY = os.getenv("BREVO_API_KEY")
SENDER_EMAIL = os.getenv("SENDER_EMAIL", "notifications@trackmysub.com")
SENDER_NAME = os.getenv("SENDER_NAME", "TrackMySub AI")

# Initialize Twilio Client conditionally
twilio_client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN) if TWILIO_ACCOUNT_SID else None

router = APIRouter()

# In-memory database for a quick Hackathon demo. 
subscriptions_db: Dict[str, dict] = {}

def send_sms(body: str, to: str):
    if twilio_client and TWILIO_PHONE_NUMBER and to:
        try:
            message = twilio_client.messages.create(
                body=body,
                from_=TWILIO_PHONE_NUMBER,
                to=to
            )
            print(f"Twilio SMS sent: {message.sid}")
        except Exception as e:
            print(f"Twilio SMS failed to send: {e}")

def send_email(subject: str, html_content: str, to_email: str):
    if not BREVO_API_KEY or not to_email:
        print("Brevo Email skipped: API Key or Recipient missing")
        return
    
    url = "https://api.brevo.com/v3/smtp/email"
    headers = {
        "accept": "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json"
    }
    
    payload = {
        "sender": {"name": SENDER_NAME, "email": SENDER_EMAIL},
        "to": [{"email": to_email}],
        "subject": subject,
        "htmlContent": html_content
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers)
        if response.status_code in [201, 202, 200]:
            print(f"Brevo Email sent to {to_email}")
        else:
            print(f"Brevo Email failed: {response.text}")
    except Exception as e:
        print(f"Brevo Email error: {e}")

@router.post("/analyze-transactions", response_model=AnalyzeResponse)
async def analyze_transactions_endpoint(request: AnalyzeRequest):
    transactions_list = [t.dict() for t in request.transactions]
    
    if not transactions_list:
        raise HTTPException(status_code=400, detail="No transactions provided")
        
    df = clean_transactions(transactions_list)
    detected_subs = detect_subscriptions(df)
    
    for sub in detected_subs:
        subscriptions_db[sub['id']] = sub
        
    insights_data = generate_insights(list(subscriptions_db.values()))
    
    return {
        "subscriptions": detected_subs,
        "insights": insights_data
    }

@router.get("/subscriptions", response_model=List[SubscriptionItem])
async def get_subscriptions():
    return list(subscriptions_db.values())

@router.post("/cancel-subscription")
async def cancel_subscription(request: CancelRequest):
    sub_id = request.subscription_id
    if sub_id not in subscriptions_db:
        # For Hackathon, we will just simulate it if not found in memory but exists in Firebase.
        subscriptions_db[sub_id] = {
            "id": sub_id, 
            "status": "Active", 
            "name": "Subscription", 
            "amount": 0, 
            "frequency": "Monthly"
        }
        
    sub = subscriptions_db[sub_id]
    sub['status'] = 'Cancelled'
    
    # Send SMS notification
    sms_body = f"SmartTracker: Successfully cancelled {sub['name']}. You saved ₹{sub['amount']}/{sub['frequency'].replace('ly', '')}!"
    send_sms(sms_body, MY_MOBILE_NUMBER)

    # Send Email notification (Fallback/Multi-channel)
    email_html = f"<h3>Subscription Cancelled</h3><p>We've successfully processed the cancellation for <b>{sub['name']}</b>.</p><p>Estimated savings: <b>₹{sub['amount']}</b>/{sub['frequency'].replace('ly', '')}</p><p>Regards,<br/>TrackMySub AI Team</p>"
    send_email(f"Cancellation Confirmed: {sub['name']}", email_html, "madhavp2023@gmail.com") # Using user's email for demo
    
    return {"message": "Subscription cancelled successfully", "status": "Cancelled"}
