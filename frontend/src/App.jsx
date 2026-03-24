import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DashboardView from './pages/DashboardView';
import SubscriptionsView from './pages/SubscriptionsView';
import AnalyzeView from './pages/AnalyzeView';
import InsightsView from './pages/InsightsView';
import { Loader2 } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { analyzeTransactions } from './services/api';
import { saveSubscriptionsToFirebase, saveTransactionsToFirebase } from './services/firebase';

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
            }
        } catch (err) {
            console.error("Error analyzing:", err);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
        
        {/* Home acts as the Layout wrapper for all protected routes */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute user={user}>
              <Home />
            </ProtectedRoute>
          }
        >
          {/* Nested sub-routes */}
          <Route index element={<DashboardWrapper />} />
          <Route path="subscriptions" element={<SubscriptionsWrapper />} />
          <Route path="analyze" element={<AnalyzeWrapper />} />
          <Route path="insights" element={<InsightsWrapper />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
