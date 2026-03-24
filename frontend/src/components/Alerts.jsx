import React from 'react';
import { Bell, AlertTriangle } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';

const Alerts = ({ subscriptions }) => {
  const upcoming = subscriptions.filter(sub => {
    const bDate = sub.next_billing_date || sub.nextBillingDate;
    if (!bDate) return false;
    const days = differenceInDays(new Date(bDate), new Date());
    return days >= 0 && days <= 7;
  }).sort((a, b) => new Date(a.next_billing_date || a.nextBillingDate) - new Date(b.next_billing_date || b.nextBillingDate));

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-6 rounded-2xl shadow-xl w-full">
      <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
        <Bell className="text-amber-400" /> Upcoming Renewals
      </h2>
      
      {upcoming.length === 0 ? (
        <div className="text-slate-400 text-sm text-center py-4 bg-slate-700/20 rounded-xl">
          No renewals in the next 7 days.
        </div>
      ) : (
        <div className="space-y-3">
          {upcoming.map((sub) => {
            const bDate = sub.next_billing_date || sub.nextBillingDate;
            const daysLeft = bDate ? differenceInDays(new Date(bDate), new Date()) : 0;
            return (
              <div key={sub.id} className="flex items-start gap-4 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl transition-all hover:bg-amber-500/20">
                <div className="bg-amber-500/20 p-2 rounded-lg">
                  <AlertTriangle className="text-amber-400 w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium">{sub.name} will renew</h4>
                  <p className="text-amber-200/80 text-sm mt-1">
                    {daysLeft === 0 ? 'Today' : `In ${daysLeft} day${daysLeft > 1 ? 's' : ''}`} • {bDate ? format(new Date(bDate), 'MMM dd, yyyy') : 'N/A'}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-white">₹{sub.amount}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Alerts;
