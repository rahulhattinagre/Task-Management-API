import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { notificationService } from '@/services/api';
import { 
  Bell, 
  CheckCircle2, 
  CheckSquare, 
  RefreshCw, 
  Trash2, 
  LogIn, 
  Clock, 
  AlertTriangle, 
  Loader, 
  X 
} from 'lucide-react';

const configByType = {
  CREATED: {
    icon: CheckSquare,
    iconColor: 'text-emerald-500',
    iconBg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    bg: 'bg-emerald-500/5',
  },
  UPDATED: {
    icon: RefreshCw,
    iconColor: 'text-violet-500',
    iconBg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    bg: 'bg-violet-500/5',
  },
  COMPLETED: {
    icon: CheckCircle2,
    iconColor: 'text-teal-500',
    iconBg: 'bg-teal-500/10',
    border: 'border-teal-500/20',
    bg: 'bg-teal-500/5',
  },
  DELETED: {
    icon: Trash2,
    iconColor: 'text-rose-500',
    iconBg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    bg: 'bg-rose-500/5',
  },
  LOGIN: {
    icon: LogIn,
    iconColor: 'text-sky-500',
    iconBg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
    bg: 'bg-sky-500/5',
  },
  DEADLINE_APPROACHING: {
    icon: Clock,
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    bg: 'bg-amber-500/5',
  },
  OVERDUE: {
    icon: AlertTriangle,
    iconColor: 'text-red-500',
    iconBg: 'bg-red-500/10',
    border: 'border-red-500/20',
    bg: 'bg-red-500/5',
  },
};

export default function NotificationPanel({ open, onClose }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    const run = async () => {
      setLoading(true);
      setError('');

      try {
        // Mark all as read when popup opens
        try {
          await notificationService.markAllAsRead();
        } catch (e) {
          // Non-fatal: still try to render notifications
          console.warn('Failed to mark notifications as read', e);
        }

        const response = await notificationService.getRecentNotifications();
        setNotifications(response.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load notifications.');
      } finally {
        setLoading(false);
      }
    };

    run();
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  let notificationContent;

  if (loading) {
    notificationContent = (
      <div className="flex items-center justify-center py-16">
        <Loader size={24} className="animate-spin text-slate-400" />
      </div>
    );
  } else if (error) {
    notificationContent = <p className="text-sm text-rose-600">{error}</p>;
  } else if (notifications.length === 0) {
    notificationContent = (
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
        No recent notifications yet.
      </div>
    );
  } else {
    notificationContent = (
      <ul className="space-y-3">
        {notifications.map((notification) => {
          const config = configByType[notification.type] || {
            icon: Bell,
            iconColor: 'text-slate-500',
            iconBg: 'bg-slate-100',
            border: 'border-slate-200',
            bg: 'bg-slate-50',
          };
          const Icon = config.icon;
          return (
            <li key={notification.id} className={`rounded-3xl border ${config.border} ${config.bg} p-4 transition duration-200 hover:shadow-sm`}>
              <div className="flex items-start gap-3">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${config.iconBg} ${config.iconColor}`}>
                  <Icon size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-900">{notification.title}</p>
                  <p className="mt-1 text-sm text-slate-500 leading-relaxed">{notification.message}</p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                <span>{new Date(notification.createdAt).toLocaleString()}</span>
                <span className={`font-semibold ${notification.read ? 'text-slate-400' : 'text-sky-600'}`}>
                  {notification.read ? 'Read' : 'New'}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className={`fixed inset-0 z-[1000] ${open ? 'pointer-events-auto' : 'pointer-events-none'} `}>
      {/* Overlay (no blur) */}
      <button
        type="button"
        aria-label="Close notifications"
        onClick={onClose}
        className={`absolute inset-0 h-full w-full bg-black/30 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Slide-out drawer */}
      <div
        className={`fixed top-0 right-0 z-[1001] h-screen w-full sm:w-[380px] md:w-[320px] max-w-full translate-x-full transition-transform duration-300 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="h-full w-full rounded-l-3xl border border-slate-200 bg-white/95 shadow-2xl shadow-slate-900/10">

          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">Notifications</p>
              <p className="text-xs text-slate-500">Recent activity from your tasks</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close notifications"
            >
              <X size={18} />
            </button>
          </div>

          <div className="max-h-[calc(100vh-72px)] overflow-y-auto p-4">{notificationContent}</div>
        </div>
      </div>
    </div>
  );
}

NotificationPanel.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

