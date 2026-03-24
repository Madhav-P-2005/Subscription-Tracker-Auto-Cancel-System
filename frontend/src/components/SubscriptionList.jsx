import React from 'react';
import SubscriptionCard from './SubscriptionCard';
import { Layers } from 'lucide-react';

const SubscriptionList = ({ subscriptions, onUpdateSubscription }) => {
  if (!subscriptions || subscriptions.length === 0) {
    return (
      <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center p-12 border border-slate-800 border-dashed rounded-3xl bg-slate-900/30">
        <Layers className="mx-auto h-12 w-12 text-slate-600 mb-3" />
        <h3 className="text-lg font-medium text-slate-300">No subscriptions found</h3>
        <p className="text-slate-500 text-sm mt-1">Upload your transactions to automatically detect active subscriptions.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      {subscriptions.map(sub => (
        <SubscriptionCard 
          key={sub.id} 
          subscription={sub} 
          onUpdate={onUpdateSubscription} 
        />
      ))}
    </div>
  );
};

export default SubscriptionList;
