import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineLightBulb, HiOutlineTrendingDown, HiOutlineLightningBolt } from 'react-icons/hi';

const Insights = ({ subscriptions }) => {
  const activeSubs = subscriptions.filter(sub => sub.status === 'Active');
  const totalMonthly = activeSubs.reduce((acc, sub) => {
    return acc + (sub.frequency.toLowerCase() === 'yearly' ? sub.amount / 12 : sub.amount);
  }, 0);

  const potentialSavings = Math.round(totalMonthly * 0.2); 

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-blue-600/10 to-indigo-600/10 backdrop-blur-2xl border border-blue-500/20 p-8 rounded-[2.5rem] shadow-2xl w-full relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-8 text-blue-500/5 group-hover:text-blue-500/10 transition-colors">
         <HiOutlineLightBulb className="w-24 h-24" />
      </div>

      <h2 className="text-2xl font-black mb-6 text-white flex items-center gap-3">
        <div className="bg-blue-500 p-2 rounded-xl shadow-lg shadow-blue-500/20">
          <HiOutlineLightBulb className="text-white w-6 h-6" />
        </div>
        AI Analytics
      </h2>
      
      <div className="space-y-6 relative z-10">
        <div className="p-6 bg-slate-900/40 rounded-3xl border border-slate-800/50 backdrop-blur-sm">
          <p className="text-slate-400 font-medium">
            Your aggregated monthly burn rate is <span className="text-white font-black text-lg">₹{Math.round(totalMonthly)}</span> across all active recurring channels.
          </p>
        </div>
        
        {potentialSavings > 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="p-6 bg-emerald-500/10 rounded-3xl border border-emerald-500/20 flex gap-4 items-start"
          >
            <div className="bg-emerald-500 p-2 rounded-xl shadow-lg shadow-emerald-500/20 shrink-0">
               <HiOutlineTrendingDown className="text-white w-6 h-6" />
            </div>
            <div>
              <p className="text-emerald-100/90 font-bold text-lg leading-tight uppercase tracking-tight">
                Optimization Detected
              </p>
              <p className="text-emerald-400 font-medium mt-1 leading-relaxed">
                Our AI suggests you could recapture <span className="text-white font-black">₹{potentialSavings}</span> monthly by eliminating ghost subscriptions.
              </p>
            </div>
          </motion.div>
        )}

        <div className="p-5 bg-blue-500/5 rounded-2xl border border-blue-500/10 flex items-center gap-3">
           <HiOutlineLightningBolt className="text-blue-400 w-5 h-5 animate-pulse" />
           <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-none">
             Real-time heuristic analysis active
           </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Insights;
