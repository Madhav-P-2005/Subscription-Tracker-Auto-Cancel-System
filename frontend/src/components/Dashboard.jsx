import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { CreditCard, Wallet, Activity } from 'lucide-react';

const StatCard = ({ title, value, subtitle, icon: Icon, colorClass }) => (
  <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-6 rounded-2xl shadow-xl flex items-start gap-4">
    <div className={`p-3 rounded-xl ${colorClass}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-slate-400 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
      {subtitle && <p className="text-slate-500 text-xs mt-1">{subtitle}</p>}
    </div>
  </div>
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
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Monthly Cost" 
          value={`₹${metrics.totalMonthlyCost}`} 
          subtitle="Estimated based on active plans"
          icon={Wallet}
          colorClass="bg-gradient-to-br from-blue-500 to-indigo-600"
        />
        <StatCard 
          title="Active Subscriptions" 
          value={metrics.count} 
          subtitle="Services currently billing you"
          icon={CreditCard}
          colorClass="bg-gradient-to-br from-emerald-500 to-teal-600"
        />
        <StatCard 
          title="Yearly Projection" 
          value={`₹${metrics.totalMonthlyCost * 12}`} 
          subtitle="If no changes are made"
          icon={Activity}
          colorClass="bg-gradient-to-br from-purple-500 to-fuchsia-600"
        />
      </div>

      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-6 rounded-2xl shadow-xl">
        <h2 className="text-lg font-semibold text-white mb-6">Spending Trend (Last 6 Months)</h2>
        <div className="h-64 w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%" debounce={100}>
            <AreaChart data={metrics.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} />
              <YAxis stroke="#64748b" axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc' }}
                itemStyle={{ color: '#60a5fa' }}
              />
              <Area type="monotone" dataKey="spending" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSpending)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
