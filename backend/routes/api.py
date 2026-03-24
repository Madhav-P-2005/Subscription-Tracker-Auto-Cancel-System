from fastapi import APIRouter, HTTPException
from typing import List, Dict
from models.schemas import AnalyzeRequest, AnalyzeResponse, CancelRequest, SubscriptionItem
from services.preprocessing import clean_transactions
from services.detection import detect_subscriptions
from services.insights import generate_insights

router = APIRouter()

# In-memory database for a quick Hackathon demo. 
# Replaces Firebase for a stateless pure FastAPI deploy.
subscriptions_db: Dict[str, dict] = {}

@router.post("/analyze-transactions", response_model=AnalyzeResponse)
async def analyze_transactions_endpoint(request: AnalyzeRequest):
    transactions_list = [t.dict() for t in request.transactions]
    
    if not transactions_list:
        raise HTTPException(status_code=400, detail="No transactions provided")
        
    df = clean_transactions(transactions_list)
    detected_subs = detect_subscriptions(df)
    
    # Store detected subscriptions in db
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
        raise HTTPException(status_code=404, detail="Subscription not found")
        
    subscriptions_db[sub_id]['status'] = 'Cancelled'
    
    return {"message": "Subscription cancelled successfully", "status": "Cancelled"}
