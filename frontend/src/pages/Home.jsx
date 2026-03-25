import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { getSubscriptionsFromFirebase, auth } from '../services/firebase';
import Sidebar from '../components/Sidebar';
import { Bell, Activity } from 'lucide-react';
import { differenceInDays } from 'date-fns';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loadingConfig, setLoadingConfig] = useState(true);

  useEffect(() => {
    const getSubs = async () => {
      try {
        const fbData = await getSubscriptionsFromFirebase();
        if (fbData && fbData.length > 0) {
          setSubscriptions(fbData);
        }
      } catch (err) {
        console.error("Error fetching subscriptions from Firebase", err);
      } finally {
        setLoadingConfig(false);
      }
    };
    getSubs();
  }, []);

  const handleUpdateSubscription = (id, updatedData) => {
    setSubscriptions(prev => 
      prev.map(sub => sub.id === id ? { ...sub, ...updatedData } : sub)
    );
  };

  const setSubsDirectly = (newSubs) => {
      setSubscriptions(prev => {
          const existingIds = new Set(prev.map(s => s.id));
          const filtered = newSubs.filter(s => !existingIds.has(s.id));
          return [...prev, ...filtered];
      });
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const upcomingCount = subscriptions.filter(sub => {
    const bDate = sub.next_billing_date || sub.nextBillingDate;
    if (!bDate) return false;
    const days = differenceInDays(new Date(bDate), new Date());
    return days >= 0 && days <= 30 && sub.status === 'Active';
  }).length;

  const handleNotificationClick = () => {
    if (upcomingCount > 0) {
      toast.success(`You have ${upcomingCount} upcoming active renewals inside your Dashboard alerts.`, { icon: '🔔' });
      navigate('/dashboard');
    } else {
      toast('No upcoming renewals in the next 30 days.', { icon: '✅' });
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex font-sans overflow-hidden">
      
      {/* Sidebar Navigation */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        user={auth.currentUser}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-72 min-h-screen flex flex-col relative">
        
        {/* Top Header */}
        <header className="h-20 border-b border-slate-800/50 bg-[#020617]/40 backdrop-blur-xl sticky top-0 z-40 flex items-center justify-between lg:justify-end px-6 lg:px-10">
           <button 
             onClick={() => setIsSidebarOpen(true)}
             className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors bg-slate-800/50 rounded-xl border border-slate-700"
           >
             <Activity className="w-6 h-6" />
           </button>

           <div className="flex items-center gap-5">
              <div className="hidden md:flex flex-col items-end mr-2">
                 <span className="text-[0.7rem] font-bold text-slate-500 uppercase tracking-widest">Logged in as</span>
                 <span className="text-[0.8rem] text-blue-400 font-medium">{auth.currentUser?.email}</span>
              </div>
              
              <button 
                onClick={handleNotificationClick}
                className="p-2.5 text-slate-400 hover:text-white transition-all bg-slate-800/30 hover:bg-slate-800/60 border border-slate-700/50 rounded-xl relative shadow-inner"
              >
                <Bell className="w-5 h-5" />
                {upcomingCount > 0 && (
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#020617] ring-1 ring-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]"></span>
                )}
              </button>

              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center p-[1px] shadow-lg shadow-blue-900/20">
                 <div className="w-full h-full bg-[#020617] rounded-[15px] flex items-center justify-center text-sm font-bold text-white">
                   {auth.currentUser?.email?.charAt(0).toUpperCase()}
                 </div>
              </div>
           </div>
        </header>

        {/* Dynamic Route Content */}
        <main className="p-6 lg:p-10 max-w-7xl mx-auto w-full overflow-y-auto custom-scrollbar">
           <Outlet context={{ subscriptions, handleUpdateSubscription, setSubsDirectly }} />
        </main>
      </div>

    </div>
  );
};

export default Home;
