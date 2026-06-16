import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Lock, Bell, Moon } from 'lucide-react';
import { toast } from 'react-toastify';

export default function SettingsPage() {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // If backend update endpoints are added later, call them here.
      updateProfile({ name: formData.name, email: formData.email });
      toast.success('Profile updated successfully!');
      setFormData((prev) => ({ ...prev, password: '' }));
    } catch (err) {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="animate-fade-in space-y-8">
      <div className="rounded-3xl bg-white/95 border border-slate-200 p-8 shadow-2xl shadow-slate-900/10">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-sky-500">Settings</p>
            <h1 className="mt-4 text-4xl font-bold text-slate-900">Account settings</h1>
            <p className="mt-2 max-w-2xl text-gray-600">
              Manage your profile, security settings, and notification preferences from one place.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 px-5 py-4 text-slate-700 shadow-sm shadow-slate-200/80">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Profile status</p>
            <p className="mt-2 text-xl font-semibold text-slate-900">{user?.name}</p>
            <p className="text-sm text-slate-500">{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.45fr_0.95fr]">
        <section className="rounded-3xl bg-white/95 border border-slate-200 p-8 shadow-lg shadow-slate-900/5">
          <h2 className="text-2xl font-semibold text-slate-900">Profile details</h2>
          <p className="mt-2 text-sm text-slate-500">Update your name, email, and password for secure access.</p>

          <form onSubmit={handleSave} className="mt-8 space-y-6">
            <div>
              <label htmlFor="settings-name" className="mb-2 block text-sm font-semibold text-slate-700">Name</label>
              <input
                id="settings-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-5 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
                required
              />
            </div>

            <div>
              <label htmlFor="settings-email" className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
              <input
                id="settings-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-5 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
                required
              />
            </div>

            <div>
              <label htmlFor="settings-password" className="mb-2 block text-sm font-semibold text-slate-700">New password</label>
              <input
                id="settings-password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Leave blank to keep current password"
                className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-5 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-sky-500 to-violet-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {saving ? 'Saving changes...' : 'Save Changes'}
            </button>
          </form>
        </section>

        <aside className="space-y-6 rounded-3xl bg-white/95 border border-slate-200 p-8 shadow-lg shadow-slate-900/5">
          <div className="rounded-3xl bg-sky-50 p-5">
            <p className="text-sm uppercase tracking-[0.24em] text-sky-500">Security</p>
            <p className="mt-2 text-sm text-slate-600">Change password and update your security preferences.</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <Lock className="text-sky-500" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Password</p>
                <p className="text-sm text-slate-500">Secure your account with a strong password.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <Bell className="text-sky-500" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Notifications</p>
                <p className="text-sm text-slate-500">Email updates for important account activity.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <Moon className="text-sky-500" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Dark mode</p>
                <p className="text-sm text-slate-500">Use the top navbar toggle to switch themes.</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
