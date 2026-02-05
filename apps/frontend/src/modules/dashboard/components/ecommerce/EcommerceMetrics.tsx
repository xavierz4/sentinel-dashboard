import React, { useEffect, useState } from 'react';

interface StatsSummary {
  totalCost: number;
  totalTokens: number;
  activeSessions: number;
  currency: string;
}

export const EcommerceMetrics = () => {
  const [stats, setStats] = useState<StatsSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // En el futuro esto vendrá de un useRepository/authStore
    fetch('http://localhost:3001/stats/summary')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const MetricCard = ({ title, value, icon, color }: { title: string, value: string | number, icon: string, color: string }) => (
    <div className="bg-white dark:bg-boxdark rounded-2xl p-6 shadow-card border border-stroke dark:border-strokedark flex items-center gap-4 hover:shadow-lg transition-shadow">
      <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white ${color}`}>
        <span className="text-2xl">{icon}</span>
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-black dark:text-white mt-1">{value}</h3>
      </div>
    </div>
  );

  if (loading) return <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
    {[1,2,3].map(i => <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>)}
  </div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard 
        title="Gasto Total" 
        value={`$${stats?.totalCost || 0} ${stats?.currency || 'USD'}`} 
        icon="💰" 
        color="bg-indigo-500"
      />
      <MetricCard 
        title="Tokens Procesados" 
        value={(stats?.totalTokens || 0).toLocaleString()} 
        icon="⚡" 
        color="bg-orange-500"
      />
      <MetricCard 
        title="Sesiones Activas" 
        value={stats?.activeSessions || 0} 
        icon="🤖" 
        color="bg-green-500"
      />
    </div>
  );
};
