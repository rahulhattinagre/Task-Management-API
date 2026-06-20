import { useState, useEffect } from 'react';
import { taskService } from '@/services/api';
import { BarChart3, AlertCircle, Loader } from 'lucide-react';
import DashboardCard from '@/components/DashboardCard';

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');



  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await taskService.getDashboard();
        setDashboard(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);


  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
        <AlertCircle className="text-red-600 mt-0.5" size={20} />
        <div>
          <p className="font-medium text-red-800">{error}</p>
        </div>
      </div>
    );
  }

  const cards = [
    { title: 'Total Tasks', count: dashboard?.totalTasks || 0, color: 'blue', icon: '📋' },
    { title: 'Pending', count: dashboard?.pendingTasks || 0, color: 'gray', icon: '⏳' },
    { title: 'In Progress', count: dashboard?.inProgressTasks || 0, color: 'yellow', icon: '⚙️' },
    { title: 'Completed', count: dashboard?.completedTasks || 0, color: 'green', icon: '✅' },
    { title: 'Overdue', count: dashboard?.overdueTasks || 0, color: 'red', icon: '⚠️' },
  ];

  return (
    <div className="animate-fade-in">
      <div className="app-section-header">
        <div>
          <p className="app-kicker">Overview</p>
          <h1 className="app-title">Dashboard</h1>
          <p className="mt-2 max-w-2xl text-gray-600">
            A quick summary of your active tasks, progress, and overdue items so you can stay focused.
          </p>
        </div>
        <div className="inline-flex items-center gap-3 rounded-3xl bg-sky-50 px-4 py-3 text-slate-700 shadow-sm shadow-sky-200/60">
          <BarChart3 size={24} className="text-sky-600" />
          <span className="text-sm font-medium">Updated just now</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {cards.map((card) => (
          <DashboardCard key={card.title} {...card} />
        ))}
      </div>

      <div className="mt-8 rounded-3xl bg-gradient-to-r from-sky-500/10 to-violet-500/10 border border-slate-200 p-8 shadow-lg shadow-slate-900/5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Keep momentum going</h2>
            <p className="mt-2 text-gray-600">
              You currently have <strong>{dashboard?.totalTasks}</strong> tasks in progress. Review completed items and close out overdue tasks.
            </p>
          </div>
          <div className="rounded-3xl bg-white/90 px-5 py-3 shadow-sm shadow-slate-900/10">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Overdue</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{dashboard?.overdueTasks || 0}</p>
          </div>
        </div>
      </div>

    </div>
  );
}
