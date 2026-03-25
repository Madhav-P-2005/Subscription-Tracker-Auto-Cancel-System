import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineCalendar, 
  HiOutlineRefresh, 
  HiOutlineTrash, 
  HiOutlineTrendingDown, 
  HiOutlineClock,
  HiOutlineCheckCircle
} from 'react-icons/hi';
import { format } from 'date-fns';
import { cancelSubscription } from '../services/api';
import { updateSubscriptionInFirebase, auth } from '../services/firebase';
import { toast } from 'react-hot-toast';

const SubscriptionCard = ({ subscription, onUpdate, index }) => {
  const [cancelling, setCancelling] = useState(false);
  const [showSavings, setShowSavings] = useState(false);

  const { id, name, amount, frequency, next_billing_date, status } = subscription;
  const isActive = status === 'Active';
  const billingDate = next_billing_date || subscription.nextBillingDate;

  const handleCancel = async () => {
    setCancelling(true);
    try {
      // API Call
      const userEmail = auth.currentUser?.email;
      await cancelSubscription(id, userEmail);
      await updateSubscriptionInFirebase(id, { status: 'Cancelled' });
      setShowSavings(true);
      setTimeout(() => {
         onUpdate(id, { ...subscription, status: 'Cancelled' });
         setShowSavings(false);
         toast.success(`${name} Cancelled successfully!`);
      }, 2500);
    } catch (err) {
      console.error("Cancellation failed", err);
      toast.error("Failed to cancel subscription. Please check your network.");
    } finally {
      setCancelling(false);
    }
  };

  // Helper to format date safely
  const formatSafeDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      return format(new Date(dateStr), 'MMM d, yyyy');
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`group relative bg-slate-800/20 backdrop-blur-2xl border border-slate-700/50 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden hover:border-blue-500/30 transition-all ${!isActive && 'opacity-70'}`}
    >
      <AnimatePresence>
        {showSavings && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, scale: 1, backdropFilter: 'blur(10px)' }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 bg-blue-600/20 flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="bg-white rounded-full p-3 mb-4 shadow-xl shadow-blue-500/20"
            >
              <HiOutlineCheckCircle className="w-10 h-10 text-blue-600" />
            </motion.div>
            <h4 className="text-xl font-bold text-white mb-1">Subscription Cancelled</h4>
            <div className="flex items-center gap-2 text-blue-100 font-medium">
              <HiOutlineTrendingDown className="w-5 h-5" />
              <span>You just saved ₹{amount}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-start relative z-10">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center border border-slate-700 shadow-xl group-hover:rotate-6 transition-transform duration-500">
             <span className="text-2xl font-black text-white">{name.charAt(0)}</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight truncate max-w-[150px]">{name}</h3>
            <div className="flex items-center gap-2 mt-1">
               <span className={`px-2.5 py-0.5 rounded-full text-[0.65rem] font-black uppercase tracking-widest ${
                 isActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-700/50 text-slate-400 border border-slate-600/50'
               }`}>
                 {status}
               </span>
               <span className="text-slate-500 text-[0.65rem] font-bold">• {frequency}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
           <div className="text-2xl font-black text-white tracking-tight">₹{amount}</div>
           <p className="text-slate-500 text-[0.65rem] font-bold uppercase tracking-widest mt-1">per {frequency?.replace('ly','')}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-10 relative z-10">
        <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800/50">
           <div className="flex items-center gap-2 text-slate-500 mb-1.5">
              <HiOutlineClock className="w-4 h-4" />
              <span className="text-[0.65rem] font-bold uppercase tracking-tighter text-blue-400/80">Cycle</span>
           </div>
           <div className="text-[0.9rem] font-bold text-slate-200">{frequency}</div>
        </div>
        <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800/50">
           <div className="flex items-center gap-2 text-slate-500 mb-1.5">
              <HiOutlineCalendar className="w-4 h-4" />
              <span className="text-[0.65rem] font-bold uppercase tracking-tighter text-blue-400/80">Next Bill</span>
           </div>
           <div className="text-[0.9rem] font-bold text-slate-200">{formatSafeDate(billingDate)}</div>
        </div>
      </div>

      <div className="mt-8 flex gap-3 relative z-10">
        <button className="flex-1 py-3.5 px-4 bg-slate-100 hover:bg-white text-slate-950 rounded-2xl font-bold text-sm transition-all active:scale-[0.98] shadow-lg shadow-white/5 flex items-center justify-center gap-2">
           <HiOutlineRefresh className="w-5 h-5" />
           Manage
        </button>
        {isActive ? (
          <button 
            onClick={handleCancel}
            disabled={cancelling}
            className="w-14 h-14 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white border border-rose-500/20 rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center group/btn"
          >
            {cancelling ? (
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <HiOutlineTrash className="w-6 h-6 transform group-hover/btn:scale-110 transition-transform" />
            )}
          </button>
        ) : (
          <div className="w-14 h-14 bg-slate-800/50 text-slate-600 border border-slate-700/50 rounded-2xl flex items-center justify-center">
             <HiOutlineTrash className="w-6 h-6 opacity-30" />
          </div>
        )}
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mb-16 -mr-16 pointer-events-none group-hover:bg-blue-500/10 transition-colors"></div>
    </motion.div>
  );
};

export default SubscriptionCard;
