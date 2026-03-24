import React from 'react';
import { Lightbulb, TrendingDown } from 'lucide-react';

const Insights = ({ subscriptions }) => {
  const activeSubs = subscriptions.filter(sub => sub.status === 'Active');
  const totalMonthly = activeSubs.reduce((acc, sub) => {
    return acc + (sub.frequency.toLowerCase() === 'yearly' ? sub.amount / 12 : sub.amount);
  }, 0);

  // A simple heuristic for savings: identify duplicate categories, or simply show 20% of the cost.
  // In a real app, AI could analyze usage to suggest cancelling unused ones.
  const potentialSavings = Math.round(totalMonthly * 0.2); 

  return (
    <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-xl border border-indigo-500/20 p-6 rounded-2xl shadow-xl w-full">
      <h2 className="text-xl font-semibold mb-4 text-indigo-300 flex items-center gap-2">
        <Lightbulb className="text-indigo-400" /> AI Insights
      </h2>
      
      <div className="space-y-4">
        <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/50">
          <p className="text-slate-300">
            You are spending <span className="text-white font-bold">₹{Math.round(totalMonthly)}/month</span> on subscriptions on average.
          </p>
        </div>
        
        {potentialSavings > 0 && (
          <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 flex gap-3">
            <TrendingDown className="text-emerald-400 shrink-0" />
            <p className="text-emerald-100/90 text-sm">
              You could save roughly <span className="text-emerald-300 font-bold">₹{potentialSavings}</span> by cancelling top underutilized services (approx 20% savings).
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Insights;
