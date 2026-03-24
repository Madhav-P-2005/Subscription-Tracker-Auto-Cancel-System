import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const analyzeTransactions = async (transactions) => {
  try {
    const response = await axios.post(`${API_URL}/analyze-transactions`, {
      transactions: transactions
    });
    return response.data;
  } catch (error) {
    console.error("Error analyzing transactions:", error);
    throw error;
  }
};

export const fetchSubscriptions = async () => {
  try {
    const response = await axios.get(`${API_URL}/subscriptions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    throw error;
  }
};

export const cancelSubscription = async (id, email) => {
  try {
    const response = await axios.post(`${API_URL}/cancel-subscription`, {
      subscription_id: id,
      user_email: email
    });
    return response.data;
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    throw error;
  }
};
