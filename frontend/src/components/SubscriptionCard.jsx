import React, { useState } from 'react';
import { Calendar, RefreshCw, XCircle, TrendingDown, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { cancelSubscription } from '../services/api';

const SubscriptionCard = ({ subscription, onUpdate }) => {
  const [cancelling, setCancelling] = useState(false);
  const [showSavings, setShowSavings] = useState(false);

  const { id, name, amount, frequency, nextBillingDate, status } = subscription;
  const isActive = status === 'Active';

  const handleCancel = async () => {
    setCancelling(true);
    try {
      // API Call
      await cancelSubscription(id);
      setShowSavings(true);
      setTimeout(() => {
        onUpdate(id, { ...subscription, status: 'Cancelled' });
        setShowSavings(false);
      }, 2500);
    } catch(err) {
      console.error(err);
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div className={`relative overflow-hidden transition-all duration-300 border rounded-2xl p-5 shadow-lg ${isActive ? 'bg-slate-800/80 border-slate-700 hover:border-blue-500/50 hover:bg-slate-800' : 'bg-slate-900/50 border-slate-800 opacity-70'}`}>
      
      {showSavings && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-emerald-900/90 backdrop-blur-md text-emerald-300 pointer-events-none fade-in">
          <TrendingDown className="w-12 h-12 mb-2 animate-bounce" />
          <h3 className="text-xl font-bold">Successfully Cancelled!</h3>
          <p className="text-sm opacity-80 mt-1">You just saved ₹{amount}/{frequency.replace('ly', '')}!</p>
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-white">{name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isActive ? 'text-emerald-400 bg-emerald-400/10' : 'text-slate-400 bg-slate-400/10'}`}>
              {status}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-blue-400">₹{amount}</p>
          <p className="text-slate-400 text-xs uppercase tracking-wider">{frequency}</p>
        </div>
      </div>

      <div className="space-y-2 mt-4 text-sm text-slate-300">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-500" />
          <span>Next Billing: <span className="text-white">{format(new Date(nextBillingDate), 'MMM dd, yyyy')}</span></span>
        </div>
        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-slate-500" />
          <span>Renews <span className="text-white capitalize">{frequency}</span></span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-700/50">
        {isActive ? (
          <button 
            disabled={cancelling}
            onClick={handleCancel}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium transition-all transform active:scale-[0.98] ${cancelling ? 'bg-rose-500/50 cursor-not-allowed text-white/70' : 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/20 hover:border-rose-500/30'}`}
          >
            {cancelling ? (
              <><Clock className="w-4 h-4 animate-spin" /> Processing...</>
            ) : (
              <><XCircle className="w-4 h-4" /> Cancel Subscription</>
            )}
          </button>
        ) : (
          <button disabled className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-slate-500 bg-slate-800/50 cursor-not-allowed">
            Cancelled
          </button>
        )}
      </div>
    </div>
  );
};

export default SubscriptionCard;
