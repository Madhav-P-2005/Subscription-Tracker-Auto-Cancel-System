from pydantic import BaseModel
from typing import List, Optional
from datetime import date

class TransactionItem(BaseModel):
    date: str
    description: str
    amount: float

class AnalyzeRequest(BaseModel):
    transactions: List[TransactionItem]

class SubscriptionItem(BaseModel):
    id: str
    name: str
    amount: float
    frequency: str
    next_billing_date: str
    status: str

class InsightsData(BaseModel):
    monthly_spend: float
    potential_savings: float
    active_subscriptions: int

class AnalyzeResponse(BaseModel):
    subscriptions: List[SubscriptionItem]
    insights: InsightsData

class CancelRequest(BaseModel):
    subscription_id: str
    user_email: Optional[str] = None
