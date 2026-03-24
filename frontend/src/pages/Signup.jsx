import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HiOutlineMail, 
  HiOutlineLockClosed, 
  HiOutlineUser, 
  HiOutlineEye, 
  HiOutlineEyeOff, 
  HiOutlineArrowRight,
  HiOutlineInformationCircle
} from 'react-icons/hi';
import { Activity } from 'lucide-react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // In a real app, update profile with name here if needed
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
         setError('This email is already associated with an account.');
      } else if (err.code === 'auth/weak-password') {
         setError('Security risk: Password must be at least 6 characters.');
      } else {
         setError('Initialization failed. Please verify your network and details.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-slate-900/40 backdrop-blur-2xl border border-slate-800/50 p-10 md:p-14 rounded-[3rem] shadow-2xl relative z-10"
      >
        <div className="text-center mb-12">
          <motion.div 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="inline-flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-3xl mb-6 shadow-xl shadow-indigo-500/20"
          >
            <Activity className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-4xl font-black text-white tracking-tight leading-tight">Create <span className="text-indigo-500">Account</span></h2>
          <p className="text-slate-500 mt-3 font-bold uppercase tracking-widest text-[0.7rem]">Join the Autonomous Finance Revolution</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-8 p-5 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-start gap-3 text-rose-400 text-sm font-medium"
          >
            <HiOutlineInformationCircle className="w-6 h-6 shrink-0" />
            <p>{error}</p>
          </motion.div>
        )}

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Full Identity</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <HiOutlineUser className="h-6 w-6 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              </div>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-14 pr-6 py-4.5 bg-slate-950/40 border border-slate-800 focus:border-indigo-500/50 focus:bg-slate-950/80 rounded-2xl outline-none text-white transition-all placeholder:text-slate-700 font-medium"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <HiOutlineMail className="h-6 w-6 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-14 pr-6 py-4.5 bg-slate-950/40 border border-slate-800 focus:border-indigo-500/50 focus:bg-slate-950/80 rounded-2xl outline-none text-white transition-all placeholder:text-slate-700 font-medium"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Secure Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <HiOutlineLockClosed className="h-6 w-6 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-14 pr-14 py-4.5 bg-slate-950/40 border border-slate-800 focus:border-indigo-500/50 focus:bg-slate-950/80 rounded-2xl outline-none text-white transition-all placeholder:text-slate-700 font-medium"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-500 hover:text-white transition-colors"
                title={showPassword ? "Hide Password" : "Show Password"}
              >
                {showPassword ? <HiOutlineEyeOff className="h-6 w-6" /> : <HiOutlineEye className="h-6 w-6" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-indigo-50 text-slate-950 py-5 px-8 rounded-2xl font-black text-lg transition-all active:scale-[0.98] shadow-2xl shadow-white/5 group relative overflow-hidden"
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-slate-900/20 border-t-slate-900 rounded-full animate-spin" />
            ) : (
              <>
                <span className="relative z-10 transition-transform group-hover:translate-x-[-4px]">Create Account</span>
                <HiOutlineArrowRight className="w-6 h-6 relative z-10 transition-transform group-hover:translate-x-2" />
              </>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </button>
        </form>

        <div className="mt-12 text-center">
          <p className="text-slate-500 font-bold text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-white hover:text-indigo-400 transition-colors underline underline-offset-8 decoration-slate-800 hover:decoration-indigo-500/50 decoration-2">
              Sign In here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
