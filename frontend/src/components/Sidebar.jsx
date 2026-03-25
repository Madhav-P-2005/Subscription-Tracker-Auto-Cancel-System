import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineViewGrid, 
  HiOutlineCreditCard, 
  HiOutlineChip, 
  HiOutlineLightBulb, 
  HiOutlineLogout,
  HiChevronRight,
  HiX
} from 'react-icons/hi';
import { Activity } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { toast } from 'react-hot-toast';

const Sidebar = ({ isOpen, onClose, user }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Successfully logged out. Stay secure.");
    } catch (err) {
      console.error("Error logging out:", err);
      toast.error("Failed to execute logout protocol.");
    }
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: HiOutlineViewGrid },
    { name: 'Subscriptions', path: '/dashboard/subscriptions', icon: HiOutlineCreditCard },
    { name: 'Analyze Data', path: '/dashboard/analyze', icon: HiOutlineChip },
    { name: 'AI Insights', path: '/dashboard/insights', icon: HiOutlineLightBulb },
  ];

  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 1024);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: isMobile ? '-100%' : 0 }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className={`fixed left-0 top-0 h-screen w-72 bg-[#0a0f1d] border-r border-slate-800 flex flex-col z-50 lg:translate-x-0 transition-none shadow-2xl lg:shadow-none`}
      >
        {/* Brand */}
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-blue-500/20">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Track<span className="text-blue-500">MySub</span>
            </span>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors">
            <HiX className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-4 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => { if(window.innerWidth < 1024) onClose(); }}
              className={({ isActive }) => `
                flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all group relative overflow-hidden
                ${isActive 
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.05)]' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40 border border-transparent'}
              `}
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3.5 relative z-10">
                    <item.icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                    <span className="font-semibold tracking-wide text-[0.95rem]">{item.name}</span>
                  </div>
                  
                  <motion.div className="relative z-10">
                    <HiChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5" />
                  </motion.div>

                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent pointer-events-none" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User / Bottom */}
        <div className="p-6 border-t border-slate-800/50 mt-auto bg-slate-900/20 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center border border-slate-700 shadow-inner">
               <span className="text-sm font-bold text-blue-400">
                 {user?.email?.charAt(0).toUpperCase() || 'U'}
               </span>
            </div>
            <div className="flex flex-col min-w-0">
               <span className="text-sm font-bold text-white truncate">User Account</span>
               <span className="text-[0.7rem] text-slate-500 truncate">{user?.email}</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 rounded-2xl transition-all group font-semibold text-sm border border-transparent hover:border-rose-500/20"
          >
            <HiOutlineLogout className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            <span>Secure Log Out</span>
          </button>
        </div>

      </motion.aside>
    </>
  );
};

export default Sidebar;
