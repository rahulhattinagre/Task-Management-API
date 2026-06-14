import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { notificationService } from '@/services/api';
import { Bell, CheckCircle2, MessageSquare, AlertTriangle, Loader, X } from 'lucide-react';

const iconByType = {
  CREATED: CheckCircle2,
  UPDATED: MessageSquare,
  DELETED: AlertTriangle,
  LOGIN: Bell,
};

export default function NotificationPanel({ open, onClose }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return;

    const fetchNotifications = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await notificationService.getRecentNotifications();
        setNotifications(response.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load notifications.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [open]);

  if (!open) return null;

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
          const Icon = iconByType[notification.type] || Bell;
          return (
            <li key={notification.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                  <Icon size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900">{notification.title}</p>
                  <p className="mt-1 text-sm text-slate-500">{notification.message}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                <span>{new Date(notification.createdAt).toLocaleString()}</span>
                <span>{notification.read ? 'Read' : 'Unread'}</span>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className="absolute right-4 top-16 z-50 w-[340px] rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
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

      <div className="max-h-[420px] overflow-y-auto p-4">{notificationContent}</div>
    </div>
  );
}

NotificationPanel.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
