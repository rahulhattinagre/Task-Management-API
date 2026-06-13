import { useAuth } from '@/context/AuthContext';
import { User, Mail, Calendar, Shield } from 'lucide-react';
import { formatDateTime } from '@/utils/helpers';

export default function ProfilePage() {
  const { user } = useAuth();

  const profileItems = [
    { label: 'Name', value: user?.name, icon: User },
    { label: 'Email', value: user?.email, icon: Mail },
    { label: 'Role', value: user?.role, icon: Shield },
    { label: 'Member Since', value: formatDateTime(user?.createdAt), icon: Calendar },
  ];

  return (
    <div className="animate-fade-in space-y-8">
      <div className="rounded-3xl bg-white/95 border border-slate-200 p-8 shadow-2xl shadow-slate-900/10">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-sky-500">Profile</p>
            <h1 className="mt-4 text-4xl font-bold text-slate-900">Your account</h1>
            <p className="mt-3 max-w-2xl text-gray-600">
              View your profile details and user role. For changes, please contact the administrator.
            </p>
          </div>
          <div className="flex items-center gap-4 rounded-3xl bg-gradient-to-r from-sky-500 to-violet-500 px-5 py-4 text-white shadow-lg shadow-sky-500/20">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/15 text-2xl font-bold">{user?.name?.charAt(0).toUpperCase()}</div>
            <div>
              <p className="text-sm uppercase tracking-[0.24em] opacity-80">Signed in as</p>
              <p className="mt-1 text-xl font-semibold">{user?.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-white/95 border border-slate-200 p-8 shadow-lg shadow-slate-900/5">
        <div className="grid gap-4 md:grid-cols-2">
          {profileItems.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-sky-500 text-white shadow-sm shadow-sky-500/20">
                <Icon size={20} />
              </div>
              <div>
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl bg-slate-50 p-5 text-sm text-slate-600">
          <p>
            <strong>Note:</strong> To update your profile information, please contact the administrator.
          </p>
        </div>
      </div>
    </div>
  );
}
