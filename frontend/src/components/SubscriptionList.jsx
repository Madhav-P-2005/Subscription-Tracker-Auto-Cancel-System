import React from 'react';
import { motion } from 'framer-motion';
import SubscriptionCard from './SubscriptionCard';
import { HiOutlineCollection, HiOutlinePlus } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const SubscriptionList = ({ subscriptions, onUpdateSubscription }) => {
  if (!subscriptions || subscriptions.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="col-span-1 md:col-span-2 lg:col-span-3 text-center p-20 py-32 border-4 border-slate-800/50 border-dashed rounded-[3rem] bg-slate-900/20"
      >
        <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
           <HiOutlineCollection className="h-12 w-12 text-slate-500" />
        </div>
        <h3 className="text-3xl font-black text-white tracking-tight">Zero Subscriptions Detected</h3>
        <p className="text-slate-500 text-lg mt-4 max-w-md mx-auto font-medium">
          Once you analyze your bank transactions, your managed recurring services will appear here automatically.
        </p>
        <Link 
          to="/dashboard/analyze"
          className="mt-10 inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-black text-lg transition-all shadow-xl shadow-blue-600/20"
        >
           <HiOutlinePlus className="w-6 h-6" /> Start First Analysis
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 w-full">
      {subscriptions.map((sub, idx) => (
        <SubscriptionCard 
          key={sub.id} 
          index={idx}
          subscription={sub} 
          onUpdate={onUpdateSubscription} 
        />
      ))}
    </div>
  );
};

export default SubscriptionList;
