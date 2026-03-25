import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineBell, HiOutlineExclamationCircle, HiOutlineClock } from 'react-icons/hi';
import { format, differenceInDays } from 'date-fns';

const Alerts = ({ subscriptions }) => {
  const upcoming = subscriptions.filter(sub => {
    const bDate = sub.next_billing_date || sub.nextBillingDate;
    if (!bDate) return false;
    const days = differenceInDays(new Date(bDate), new Date());
    return days >= 0 && days <= 30;
  }).sort((a, b) => new Date(a.next_billing_date || a.nextBillingDate) - new Date(b.next_billing_date || b.nextBillingDate));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-slate-800/20 backdrop-blur-2xl border border-slate-700/50 p-8 rounded-[2.5rem] shadow-2xl w-full"
    >
      <h2 className="text-2xl font-black mb-6 text-white flex items-center gap-3">
        <div className="bg-amber-500 p-2 rounded-xl shadow-lg shadow-amber-500/20">
          <HiOutlineBell className="text-white w-6 h-6" />
        </div>
        Renewal Alerts
      </h2>
      
      {upcoming.length === 0 ? (
        <div className="text-slate-500 font-bold uppercase tracking-widest text-xs text-center py-10 bg-slate-900/40 rounded-3xl border border-slate-800/50 border-dashed">
          No pending renewals in the near horizon.
        </div>
      ) : (
        <div className="space-y-4">
          {upcoming.map((sub, idx) => {
            const bDate = sub.next_billing_date || sub.nextBillingDate;
            const daysLeft = bDate ? differenceInDays(new Date(bDate), new Date()) : 0;
            return (
              <motion.div 
                key={sub.id} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + (idx * 0.1) }}
                className="flex items-center gap-5 p-5 bg-amber-500/5 hover:bg-amber-500/10 border border-amber-500/10 hover:border-amber-500/30 rounded-3xl transition-all group"
              >
                <div className="bg-amber-500/20 p-3 rounded-2xl group-hover:scale-110 transition-transform">
                  <HiOutlineExclamationCircle className="text-amber-400 w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-bold truncate tracking-tight">{sub.name}</h4>
                  <p className="text-amber-200/60 text-xs font-bold uppercase tracking-widest mt-1">
                    {daysLeft === 0 ? 'Due Today' : `In ${daysLeft} day${daysLeft > 1 ? 's' : ''}`} • {bDate ? format(new Date(bDate), 'MMM d') : 'N/A'}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-lg font-black text-white px-3 py-1 bg-slate-900/60 rounded-xl border border-slate-800/50">
                    ₹{sub.amount}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <div className="mt-6 flex items-center justify-center gap-2 text-slate-600">
         <HiOutlineClock className="w-4 h-4" />
         <span className="text-[0.6rem] font-black uppercase tracking-[0.2em]">Next 30 Days Monitored</span>
      </div>
    </motion.div>
  );
};

export default Alerts;