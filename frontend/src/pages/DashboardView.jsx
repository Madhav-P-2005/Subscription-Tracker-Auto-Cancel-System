import React from 'react';
import Dashboard from '../components/Dashboard';
import Alerts from '../components/Alerts';

const DashboardView = ({ subscriptions }) => {
  return (
    <div className="space-y-8 fade-in">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Overview</h1>
        <p className="text-slate-400 mt-2">Welcome back! Here's a summary of your financial health.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Dashboard subscriptions={subscriptions} />
        </div>
        <div className="space-y-8">
          <Alerts subscriptions={subscriptions} />
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
