import pandas as pd
import numpy as np
from datetime import timedelta
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import uuid

def detect_subscriptions(df):
    """
    Detects recurring subscriptions from a DataFrame of transactions.
    Returns a list of subscription dictionaries.
    """
    if df.empty or len(df) < 2:
        return []

    # Filter out obvious non-subscriptions based on keywords if needed,
    # but for now we'll cluster all clean descriptions using TF-IDF.
    
    # 1. TF-IDF Clustering
    vectorizer = TfidfVectorizer(stop_words='english')
    # If there are not enough varying descriptions, TF-IDF might fail, let's catch that
    try:
        tfidf_matrix = vectorizer.fit_transform(df['clean_description'])
        cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
    except Exception:
        # Fallback to exact match on clean description if vectorizer fails
        cosine_sim = np.eye(len(df))

    # Basic greedy clustering based on similarity > 0.75
    visited = set()
    clusters = []
    
    for i in range(len(df)):
        if i in visited:
            continue
        # Find all similar transactions
        similar_indices = [j for j in range(len(df)) if cosine_sim[i][j] > 0.75]
        visited.update(similar_indices)
        clusters.append(df.iloc[similar_indices])

    subscriptions = []

    # 2. Analyze each cluster for recurring patterns
    for cluster_df in clusters:
        if len(cluster_df) < 2:
            continue
        
        cluster_df = cluster_df.sort_values(by='date')
        
        # Check amount variation: is standard deviation small compared to mean?
        # Or just max_amount / min_amount < 1.1 (±10%)
        # But Netflix might update prices. Let's look at the latest consecutive amounts.
        amounts = cluster_df['amount'].values
        mean_amount = np.mean(amounts)
        std_amount = np.std(amounts)
        
        # Simple ±10% check -> standard deviation should be small
        if mean_amount == 0 or (std_amount / mean_amount) > 0.3:
            # High variation in amounts -> not a typical subscription
            continue
            
        # 3. Check frequency
        dates = pd.to_datetime(cluster_df['date'].values)
        diff_days = [ (dates[k] - dates[k-1]).days for k in range(1, len(dates)) ]
        
        avg_diff = np.mean(diff_days)
        
        frequency = None
        next_billing_date = None
        
        if 5 <= avg_diff <= 10:
            frequency = "Weekly"
            next_billing_date = dates[-1] + np.timedelta64(7, 'D')
        elif 25 <= avg_diff <= 35:
            frequency = "Monthly"
            next_billing_date = dates[-1] + np.timedelta64(30, 'D')
        elif 350 <= avg_diff <= 380:
            frequency = "Yearly"
            next_billing_date = dates[-1] + np.timedelta64(365, 'D')
            
        if frequency:
            # We found a subscription!
            # Use original description from the latest transaction as the name
            latest_idx = cluster_df['date'].idxmax()
            original_name = cluster_df.loc[latest_idx, 'description']
            
            # Basic clean-up for name (e.g. "Netflix INC" -> "Netflix INC")
            name = original_name.title()

            subscriptions.append({
                "id": str(uuid.uuid4()),
                "name": name,
                "amount": float(cluster_df.loc[latest_idx, 'amount']),
                "frequency": frequency,
                "next_billing_date": str(pd.to_datetime(next_billing_date).date()),
                "status": "Active"
            })
            
    return subscriptions
