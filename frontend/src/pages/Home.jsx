import React, { useState, useEffect } from 'react';
import { analyzeTransactions } from '../services/api';
import { saveSubscriptionsToFirebase, saveTransactionsToFirebase, getSubscriptionsFromFirebase } from '../services/firebase';
import Dashboard from '../components/Dashboard';
import Upload from '../components/Upload';
import SubscriptionList from '../components/SubscriptionList';
import Insights from '../components/Insights';
import Alerts from '../components/Alerts';
import { Activity, Bell, LogOut } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';

const Home = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loadingConfig, setLoadingConfig] = useState(true);

  useEffect(() => {
    // Initial fetch from Firebase mapping 
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

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  const handleUploadComplete = async (transactions) => {
    try {
      // 1. Send all data to be stored into firebase
      await saveTransactionsToFirebase(transactions);

      // 2. Fetch ML detections from FastAPI
      const res = await analyzeTransactions(transactions);
      
      if (res.subscriptions) {
        // 3. Save detection mapping states into core Firebase architecture
        await saveSubscriptionsToFirebase(res.subscriptions);
        
        setSubscriptions(prev => {
          // simple merge logic
          const existingIds = new Set(prev.map(s => s.id));
          const newSubs = res.subscriptions.filter(s => !existingIds.has(s.id));
          return [...prev, ...newSubs];
        });
      }
    } catch (err) {
      console.error("Error analyzing transactions", err);
    }
  };

  const handleUpdateSubscription = (id, updatedData) => {
    setSubscriptions(prev => 
      prev.map(sub => sub.id === id ? { ...sub, ...updatedData } : sub)
    );
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-blue-500/30">
      
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-[#0f172a]/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-xl">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                TrackMySub
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
                <Bell className="w-6 h-6" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full"></span>
              </button>
              <button 
                onClick={handleLogout}
                className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:bg-rose-500/20 hover:border-rose-500/50 transition-all cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Header Section */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Financial Overview</h1>
          <p className="text-slate-400 mt-2 text-lg">Manage your recurring payments and identify savings.</p>
        </div>

        {/* Dashboard Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Column (Left - 2/3) */}
          <div className="lg:col-span-2 space-y-8">
            <Dashboard subscriptions={subscriptions} />
            
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Your Subscriptions</h2>
              <SubscriptionList 
                subscriptions={subscriptions} 
                onUpdateSubscription={handleUpdateSubscription} 
              />
            </div>
          </div>

          {/* Sidebar Column (Right - 1/3) */}
          <div className="space-y-8">
            <Upload onDataUpload={handleUploadComplete} />
            {subscriptions.length > 0 && (
              <>
                <Insights subscriptions={subscriptions} />
                <Alerts subscriptions={subscriptions} />
              </>
            )}
          </div>
          
        </div>

      </main>
    </div>
  );
};

export default Home;
