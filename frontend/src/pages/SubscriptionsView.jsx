import React from 'react';
import SubscriptionList from '../components/SubscriptionList';

const SubscriptionsView = ({ subscriptions, onUpdate }) => {
  return (
    <div className="space-y-8 fade-in">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Manage Subscriptions</h1>
        <p className="text-slate-400 mt-2">Track, modify, or simulate cancellations for your service contracts.</p>
      </div>

      <div className="bg-slate-800/30 border border-slate-700 p-6 rounded-3xl min-h-[400px]">
        <SubscriptionList 
          subscriptions={subscriptions} 
          onUpdateSubscription={onUpdate} 
        />
      </div>
    </div>
  );
};

export default SubscriptionsView;
