import pandas as pd
import re

def clean_transactions(transactions_list):
    """
    Convert raw transaction dicts into a clean Pandas DataFrame.
    """
    df = pd.DataFrame(transactions_list)
    
    # Ensure date is datetime
    df['date'] = pd.to_datetime(df['date'])
    
    # Ensure amount is float
    df['amount'] = pd.to_numeric(df['amount'], errors='coerce').fillna(0.0)
    
    # Normalize descriptions: lowercase, remove special characters and numbers
    # (Leaving numbers might be useful for some merchants, but for grouping it's better to remove them or keep basic text)
    def normalize_desc(text):
        if not isinstance(text, str):
            return ""
        text = text.lower()
        # Remove common transaction noise terms
        noise_words = ['pos', 'txn', 'card', 'payment', 'debit', 'upi', 'ref', 'subscription', 'bill']
        text = re.sub(r'[^a-z\s]', ' ', text)
        words = text.split()
        words = [w for w in words if w not in noise_words and len(w) > 2]
        return " ".join(words).strip()
    
    df['clean_description'] = df['description'].apply(normalize_desc)
    
    # Keep original description for assigning names later
    return df