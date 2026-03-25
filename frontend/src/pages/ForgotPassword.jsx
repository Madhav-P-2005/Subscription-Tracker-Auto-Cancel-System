import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../services/firebase';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { 
  HiOutlineMail, 
  HiOutlineArrowLeft, 
  HiOutlineCheckCircle, 
  HiOutlineInformationCircle,
  HiOutlineSparkles
} from 'react-icons/hi';
import { Activity } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      await sendPasswordResetEmail(auth, email);
      const msg = 'Recovery link dispatched. Please check your secure inbox.';
      setMessage(msg);
      toast.success(msg);
    } catch (err) {
      console.error(err);
      let errMsg = 'System Error: Failed to initiate recovery protocol.';
      if (err.code === 'auth/user-not-found') {
        errMsg = 'Reference Error: No account matching this identity.';
      }
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-slate-900/40 backdrop-blur-2xl border border-slate-800/50 p-10 md:p-14 rounded-[3rem] shadow-2xl relative z-10"
      >
        <div className="text-center mb-12">
          <motion.div 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="inline-flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-3xl mb-6 shadow-xl shadow-blue-500/20"
          >
            <Activity className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-4xl font-black text-white tracking-tight leading-tight">Reset <span className="text-blue-500">Access</span></h2>
          <p className="text-slate-500 mt-3 font-bold uppercase tracking-widest text-[0.7rem]">Identity Recovery Protocol</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-5 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-start gap-3 text-rose-400 text-sm font-medium"
          >
            <HiOutlineInformationCircle className="w-6 h-6 shrink-0" />
            <p>{error}</p>
          </motion.div>
        )}

        {message && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-start gap-3 text-emerald-400 text-sm font-medium"
          >
            <HiOutlineCheckCircle className="w-6 h-6 shrink-0" />
            <p>{message}</p>
          </motion.div>
        )}

        <form onSubmit={handleReset} className="space-y-8">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Verification Email</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <HiOutlineMail className="h-6 w-6 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-14 pr-6 py-4.5 bg-slate-950/40 border border-slate-800 focus:border-blue-500/50 focus:bg-slate-950/80 rounded-2xl outline-none text-white transition-all placeholder:text-slate-700 font-medium"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-blue-50 text-slate-950 py-5 px-8 rounded-2xl font-black text-lg transition-all active:scale-[0.98] shadow-2xl shadow-white/5 group relative overflow-hidden"
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-slate-900/20 border-t-slate-900 rounded-full animate-spin" />
            ) : (
              <>
                <HiOutlineSparkles className="w-6 h-6 text-blue-600 transition-transform group-hover:rotate-12" />
                <span className="relative z-10">Send Recovery Link</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-12 text-center">
          <Link to="/login" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-all font-black uppercase tracking-widest text-[0.7rem] group">
            <HiOutlineArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Return to Terminal
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
