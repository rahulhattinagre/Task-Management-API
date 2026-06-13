import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Menu, LogOut, Bell } from 'lucide-react';

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="border-b border-slate-200 bg-white/95 backdrop-blur-xl shadow-sm shadow-slate-200/40">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden rounded-2xl p-2 text-slate-600 transition hover:bg-slate-100"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-500">Task Manager</p>
            <p className="text-sm text-slate-500">Your productivity workspace</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden rounded-2xl bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200 sm:inline-flex">
            <Bell size={18} />
          </button>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 shadow-sm shadow-slate-200/50">
            <p className="font-medium">{user?.name}</p>
            <p className="text-xs text-slate-500">{user?.role}</p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-600 transition hover:border-red-300 hover:text-red-600 hover:bg-red-50"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  onMenuClick: PropTypes.func.isRequired,
};
