import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';
import { 
  HiOutlineCurrencyRupee, 
  HiOutlineClipboardList, 
  HiOutlineChartBar,
  HiOutlineTrendingDown,
  HiOutlineLightningBolt
} from 'react-icons/hi';

const StatCard = ({ title, value, subtitle, icon: Icon, colorClass, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 p-6 rounded-3xl shadow-xl flex items-start gap-5 group transition-all hover:bg-slate-800/60 hover:border-slate-600/50"
  >
    <div className={`p-4 rounded-2xl ${colorClass} shadow-lg transition-transform group-hover:scale-110 duration-300`}>
      <Icon className="w-7 h-7 text-white" />
    </div>
    <div className="flex-1">
      <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{title}</p>
      <div className="flex items-baseline gap-2 mt-1">
        <h3 className="text-3xl font-extrabold text-white tracking-tight">{value}</h3>
      </div>
      {subtitle && (
        <div className="flex items-center gap-1.5 mt-2">
           <HiOutlineLightningBolt className="w-3.5 h-3.5 text-blue-400" />
           <p className="text-slate-500 text-[0.7rem] font-medium italic">{subtitle}</p>
        </div>
      )}
    </div>
  </motion.div>
);

const Dashboard = ({ subscriptions }) => {
  
  const activeSubs = subscriptions.filter(s => s.status === 'Active');
  
  const metrics = useMemo(() => {
    let totalMonthlyCost = 0;
    activeSubs.forEach(s => {
      totalMonthlyCost += s.frequency?.toLowerCase() === 'yearly' ? s.amount / 12 : s.amount;
    });
    
    // Create dummy chart data based on active subs to show a 6 month projection
    const chartData = [];
    const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
    let base = Math.max(totalMonthlyCost - 500, 500);
    months.forEach((m, i) => {
       chartData.push({
           name: m,
           spending: i === months.length - 1 ? Math.round(totalMonthlyCost) : Math.round(base + (i * 100) + Math.random() * 200)
       });
    });

    return { totalMonthlyCost: Math.round(totalMonthlyCost), chartData, count: activeSubs.length };
  }, [activeSubs]);

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-700">
      
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-extrabold text-white tracking-tight"
          >
            Financial <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 text-glow">Overview</span>
          </motion.h1>
          <p className="text-slate-400 mt-2 font-medium">Tracking {metrics.count} recurring services across your accounts.</p>
        </div>
        
        <div className="flex items-center gap-3 bg-slate-800/30 p-2 rounded-2xl border border-slate-700/50 backdrop-blur-md">
           <div className="flex -space-x-3">
              {[1,2,3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#020617] bg-slate-700 overflow-hidden shadow-lg">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+10}`} alt="user" />
                </div>
              ))}
           </div>
           <span className="text-xs font-bold text-slate-400 pr-2">+ {Math.floor(Math.random() * 50)} Active Users</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          index={0}
          title="Monthly Burn Rate" 
          value={`₹${metrics.totalMonthlyCost}`} 
          subtitle="Real-time spending index"
          icon={HiOutlineCurrencyRupee}
          colorClass="bg-gradient-to-br from-blue-500 to-indigo-600"
        />
        <StatCard 
          index={1}
          title="Active Plans" 
          value={metrics.count} 
          subtitle="Managed billing cycles"
          icon={HiOutlineClipboardList}
          colorClass="bg-gradient-to-br from-indigo-500 to-purple-600"
        />
        <StatCard 
          index={2}
          title="Yearly Projection" 
          value={`₹${(metrics.totalMonthlyCost * 12).toLocaleString()}`} 
          subtitle="Forecasted net drain"
          icon={HiOutlineChartBar}
          colorClass="bg-gradient-to-br from-violet-500 to-fuchsia-600"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-800/30 backdrop-blur-2xl border border-slate-700/50 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-blue-500/10 transition-colors duration-1000"></div>
        
        <div className="flex items-center justify-between mb-8">
           <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
              <h2 className="text-xl font-bold text-white tracking-tight">Spending Trajectory</h2>
           </div>
           
           <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-xl border border-slate-700/50 text-xs font-bold text-emerald-400">
              <HiOutlineTrendingDown className="w-4 h-4" />
              <span>STABLE</span>
           </div>
        </div>

        <div className="h-72 w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} debounce={100}>
            <AreaChart data={metrics.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} strokeOpacity={0.2} />
              <XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} tick={{fontSize: 12}} dy={10} />
              <YAxis stroke="#64748b" axisLine={false} tickLine={false} tick={{fontSize: 12}} tickFormatter={(val) => `₹${val}`} dx={-10} />
              <Tooltip 
                cursor={{ stroke: '#3b82f6', strokeWidth: 2, strokeDasharray: '5 5' }}
                contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(51, 65, 85, 0.5)', borderRadius: '16px', color: '#f8fafc', backdropFilter: 'blur(10px)', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                itemStyle={{ color: '#60a5fa', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="spending" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorSpending)" animationDuration={2000} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
