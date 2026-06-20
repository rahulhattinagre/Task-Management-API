import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Bell, Settings, X, LogOut } from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: CheckSquare, label: 'My Tasks', path: '/tasks' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function Sidebar({ open, setOpen }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="lg:hidden fixed inset-0 z-40 bg-slate-900/40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:relative z-50 h-screen w-72 overflow-y-auto bg-slate-950/95 border-r border-slate-800/80 px-6 pb-8 pt-6 transition duration-300 ease-out text-slate-100 ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-300/80">Task Manager</p>
            <h2 className="mt-2 text-2xl font-bold text-white">Workspace</h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden rounded-2xl bg-white/10 p-2 text-slate-100 transition hover:bg-white/15"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-3">
          {menuItems.map(({ icon: Icon, label, path }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition ${
                isActive(path)
                  ? 'bg-slate-200/10 text-white shadow-[0_0_0_1px_rgba(148,163,184,0.12)]'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-10 space-y-3 rounded-3xl bg-white/5 p-5 text-sm text-slate-300 shadow-inner shadow-slate-900/10">
          <div className="flex items-center gap-3 text-slate-400">
            <Bell size={16} />
            <span>Notifications</span>
          </div>
          <p className="text-slate-500">Get instant updates on tasks, deadlines, and team activity.</p>
        </div>

        <button
          onClick={() => {
            setOpen(false);
            window.location.href = '/login';
          }}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-3xl border border-slate-700/70 bg-slate-900/80 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </>
  );
}

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
