import React from 'react';
import Insights from '../components/Insights';
import Alerts from '../components/Alerts';

const InsightsView = ({ subscriptions }) => {
  return (
    <div className="space-y-8 fade-in">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">AI & Savings Insights</h1>
        <p className="text-slate-400 mt-2">Deep analytics on your subscription spending and optimization suggestions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <Insights subscriptions={subscriptions} />
        </div>
        <div className="space-y-8">
          <Alerts subscriptions={subscriptions} />
          <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
            <h3 className="text-blue-400 font-bold mb-2">Optimizing Your Wallet</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Our AI continuously monitors your billing cycles. If we detect a subscription hasn't been used, 
              or if a price hike is detected in the next cycle, we'll notify you here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsView;
