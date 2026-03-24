import React from 'react';
import { motion } from 'framer-motion';
import Insights from '../components/Insights';
import Alerts from '../components/Alerts';
import { HiOutlinePresentationChartLine, HiOutlineShieldCheck } from 'react-icons/hi';

const InsightsView = ({ subscriptions }) => {
  return (
    <div className="space-y-10 pb-20">
      <div className="max-w-4xl">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           className="flex items-center gap-3 mb-4"
        >
           <div className="bg-indigo-500/10 p-2 rounded-xl border border-indigo-500/20">
              <HiOutlinePresentationChartLine className="w-6 h-6 text-indigo-400" />
           </div>
           <span className="text-indigo-500 font-bold uppercase tracking-widest text-xs">Analytical Intelligence</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl font-black text-white tracking-tight leading-tight"
        >
          Savings & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Heuristics</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 mt-6 text-xl leading-relaxed max-w-2xl font-medium"
        >
          Our neural models evaluate your spending velocity and recurring standard deviations 
          to provide actionable fiscal optimizations.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-10">
          <Insights subscriptions={subscriptions} />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="p-10 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/20 rounded-[2.5rem] relative overflow-hidden group shadow-2xl"
          >
            <div className="absolute top-0 right-0 p-8 text-blue-500/5 group-hover:text-blue-500/10 transition-colors">
               <HiOutlineShieldCheck className="w-32 h-32" />
            </div>
            <h3 className="text-blue-400 font-black mb-4 uppercase tracking-[0.2em] text-xs">Autonomous Guard</h3>
            <p className="text-white text-xl font-bold leading-relaxed relative z-10">
              "AI identifies price creep and duplicate services automatically. Your capital is strictly monitored."
            </p>
          </motion.div>
        </div>
        
        <div className="space-y-10">
          <Alerts subscriptions={subscriptions} />
        </div>
      </div>
    </div>
  );
};

export default InsightsView;
