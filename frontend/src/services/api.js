import axios from 'axios';

// Currently mocking FastAPI backend. 
// When backend is ready, set the base URL.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Dummy function to simulate processing of transactions into subscriptions
export const analyzeTransactions = async (transactions) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock recurring detection engine
      const detected = [
        { id: 'sub_1', name: 'Netflix', amount: 499, frequency: 'monthly', nextBillingDate: '2026-03-25', status: 'Active' },
        { id: 'sub_2', name: 'Spotify', amount: 119, frequency: 'monthly', nextBillingDate: '2026-04-01', status: 'Active' },
        { id: 'sub_3', name: 'Gym Membership', amount: 1500, frequency: 'monthly', nextBillingDate: '2026-03-28', status: 'Active' },
        { id: 'sub_4', name: 'Amazon Prime', amount: 1499, frequency: 'yearly', nextBillingDate: '2026-10-15', status: 'Active' },
      ];
      resolve({ subscriptions: detected });
    }, 1500);
  });
};

export const fetchSubscriptions = async () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve([]), 500);
    });
}
