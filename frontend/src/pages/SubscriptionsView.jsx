import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SubscriptionList from '../components/SubscriptionList';
import { HiOutlineAdjustments, HiOutlineSearch, HiOutlineDownload } from 'react-icons/hi';
import Papa from 'papaparse';
import { toast } from 'react-hot-toast';

const SubscriptionsView = ({ subscriptions, onUpdate }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSubscriptions = subscriptions?.filter(sub => 
    sub.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleDownloadCSV = () => {
    if (!subscriptions || subscriptions.length === 0) {
      toast.error("No subscriptions to download.");
      return;
    }
    try {
      const csv = Papa.unparse(subscriptions);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'subscriptions.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("CSV Downloaded Successfully!");
    } catch (err) {
      toast.error("Failed to generate CSV.");
    }
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="max-w-4xl flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="flex items-center gap-3 mb-4"
          >
             <div className="bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20">
                <HiOutlineAdjustments className="w-6 h-6 text-emerald-400" />
             </div>
             <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs">Portfolio Management</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-black text-white tracking-tight leading-tight"
          >
            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Subscriptions</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 mt-6 text-xl leading-relaxed max-w-2xl font-medium"
          >
            Unified control center for all your recurring contracts. Monitor billing health 
            and execute cancellations in one click.
          </motion.p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
             className="relative group min-w-[300px]"
          >
             <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-emerald-400 transition-colors" />
             <input 
               type="text" 
               placeholder="Filter services by name..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full bg-slate-900/40 border border-slate-800 focus:border-emerald-500/50 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium"
             />
          </motion.div>
          
          <motion.button
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.4 }}
             onClick={handleDownloadCSV}
             className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white py-4 px-6 rounded-2xl font-bold transition-colors shadow-lg shadow-emerald-500/20"
          >
             <HiOutlineDownload className="w-5 h-5" />
             Export
          </motion.button>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-800/20 border border-slate-700/50 p-8 rounded-[3rem] min-h-[500px] shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
        
        <SubscriptionList 
          subscriptions={filteredSubscriptions} 
          onUpdateSubscription={onUpdate} 
        />
      </motion.div>
    </div>
  );
};

export default SubscriptionsView;
