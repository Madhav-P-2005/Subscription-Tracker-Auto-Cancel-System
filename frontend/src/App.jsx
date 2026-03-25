import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Landing from './pages/Landing';
import DashboardView from './pages/DashboardView';
import SubscriptionsView from './pages/SubscriptionsView';
import AnalyzeView from './pages/AnalyzeView';
import InsightsView from './pages/InsightsView';
import { Loader2 } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { analyzeTransactions } from './services/api';
import { saveSubscriptionsToFirebase, saveTransactionsToFirebase } from './services/firebase';
import { Toaster } from 'react-hot-toast';

// Wrapper components to pass context to the views
const DashboardWrapper = () => {
    const { subscriptions } = useOutletContext();
    return <DashboardView subscriptions={subscriptions} />;
};

const SubscriptionsWrapper = () => {
    const { subscriptions, handleUpdateSubscription } = useOutletContext();
    return <SubscriptionsView subscriptions={subscriptions} onUpdate={handleUpdateSubscription} />;
};

const AnalyzeWrapper = () => {
    const { setSubsDirectly } = useOutletContext();
    
    const onUpload = async (transactions) => {
        try {
            await saveTransactionsToFirebase(transactions);
            const res = await analyzeTransactions(transactions);
            if (res.subscriptions) {
                await saveSubscriptionsToFirebase(res.subscriptions);
                setSubsDirectly(res.subscriptions);
                return res;
            }
            throw new Error("Analysis failed");
        } catch (err) {
            console.error("Error analyzing:", err);
            throw err;
        }
    };

    return <AnalyzeView onUpload={onUpload} />;
};

const InsightsWrapper = () => {
    const { subscriptions } = useOutletContext();
    return <InsightsView subscriptions={subscriptions} />;
};

const ProtectedRoute = ({ children, user }) => {
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

// Animation variants for page transitions
const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: "easeIn" } }
};

const AnimatedRoutes = ({ user, loading }) => {
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          <p className="text-slate-400 font-black uppercase tracking-widest text-[0.7rem] animate-pulse">Initializing TrackMySub...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
            <Landing />
          </motion.div>
        } />
        <Route path="/login" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full h-full">
            {!user ? <Login /> : <Navigate to="/dashboard" />}
          </motion.div>
        } />
        <Route path="/signup" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full h-full">
            {!user ? <Signup /> : <Navigate to="/dashboard" />}
          </motion.div>
        } />
        <Route path="/forgot-password" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full h-full">
            <ForgotPassword />
          </motion.div>
        } />
        
        {/* Protected Dashboard Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute user={user}>
              <Home user={user} />
            </ProtectedRoute>
          }
        >
          <Route index element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
              <DashboardWrapper />
            </motion.div>
          } />
          <Route path="subscriptions" element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
              <SubscriptionsWrapper />
            </motion.div>
          } />
          <Route path="analyze" element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
              <AnalyzeWrapper />
            </motion.div>
          } />
          <Route path="insights" element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
              <InsightsWrapper />
            </motion.div>
          } />
        </Route>

        {/* Catch-all Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#f8fafc',
            border: '1px solid #334155',
          },
        }} 
      />
      <AnimatedRoutes user={user} loading={loading} />
    </Router>
  );
}

export default App;