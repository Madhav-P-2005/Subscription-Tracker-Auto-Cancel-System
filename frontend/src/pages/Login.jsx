import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { 
  HiOutlineMail, 
  HiOutlineLockClosed, 
  HiOutlineEye, 
  HiOutlineEyeOff, 
  HiOutlineArrowRight,
  HiOutlineInformationCircle,
  HiOutlineShieldCheck
} from 'react-icons/hi';
import { Activity } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Successfully logged in!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      const msg = 'Invalid credentials. Please verify your email and password.';
      setError(msg);
      toast.error(msg);
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
          <h2 className="text-4xl font-black text-white tracking-tight leading-tight">Welcome <span className="text-blue-500">Back</span></h2>
          <p className="text-slate-500 mt-3 font-bold uppercase tracking-widest text-[0.7rem]">Autonomous Subscription Management</p>
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

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Email Address</label>
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

          <div className="space-y-2">
            <div className="flex justify-between items-center px-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Password</label>
              <Link to="/forgot-password" virtual="true" className="text-xs text-blue-500/80 hover:text-blue-400 font-black uppercase tracking-wider transition-colors">
                Lost access?
              </Link>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <HiOutlineLockClosed className="h-6 w-6 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-14 pr-14 py-4.5 bg-slate-950/40 border border-slate-800 focus:border-blue-500/50 focus:bg-slate-950/80 rounded-2xl outline-none text-white transition-all placeholder:text-slate-700 font-medium"
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

          <div className="flex items-center justify-between px-2">
            <label className="flex items-center gap-3 cursor-pointer group select-none">
              <div className="relative">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="peer sr-only"
                />
                <div className="w-5 h-5 border-2 border-slate-700 rounded-lg peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all"></div>
                <HiOutlineShieldCheck className="absolute top-0.5 left-0.5 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
              </div>
              <span className="text-sm text-slate-500 font-bold group-hover:text-slate-400 transition-colors">Trust this session</span>
            </label>
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
                <span className="relative z-10 transition-transform group-hover:translate-x-[-4px]">Enter Terminal</span>
                <HiOutlineArrowRight className="w-6 h-6 relative z-10 transition-transform group-hover:translate-x-2" />
              </>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </button>
        </form>

        <div className="mt-12 text-center">
          <p className="text-slate-500 font-bold text-sm">
            Not registered?{' '}
            <Link to="/signup" className="text-white hover:text-blue-400 transition-colors underline underline-offset-8 decoration-slate-800 hover:decoration-blue-500/50 decoration-2">
              Initialize Account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
