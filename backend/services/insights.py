def generate_insights(subscriptions):
    """
    Computes total monthly spend and potential savings.
    """
    active_subs = [s for s in subscriptions if s.get('status') == 'Active']
    
    monthly_spend = 0.0
    for sub in active_subs:
        freq = sub.get('frequency', 'Monthly')
        amt = sub.get('amount', 0.0)
        if freq == 'Yearly':
            monthly_spend += amt / 12.0
        elif freq == 'Weekly':
            monthly_spend += amt * 4.33
        else:
            monthly_spend += amt
            
    potential_savings = monthly_spend * 0.20 # 20% heuristic for savings
    
    return {
        "monthly_spend": round(monthly_spend, 2),
        "potential_savings": round(potential_savings, 2),
        "active_subscriptions": len(active_subs)
    }
