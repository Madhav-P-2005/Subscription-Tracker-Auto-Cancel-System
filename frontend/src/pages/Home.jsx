import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { getSubscriptionsFromFirebase } from '../services/firebase';
import Sidebar from '../components/Sidebar';
import { Bell } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex font-sans">
      
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 min-h-screen flex flex-col">
        
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800 bg-[#020617]/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-end px-8">
           <div className="flex items-center gap-4">
              <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">
                JD
              </div>
           </div>
        </header>

        {/* Dynamic Route Content */}
        <main className="p-8 max-w-7xl mx-auto w-full">
           {/* We pass state via context/props to the Outlet if needed, or children can fetch their own */}
           <Outlet context={{ subscriptions, handleUpdateSubscription, setSubsDirectly }} />
        </main>
      </div>

    </div>
  );
};

export default Home;
