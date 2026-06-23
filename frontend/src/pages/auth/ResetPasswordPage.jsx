import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { authService } from '@/services/api';
import { toast } from 'react-toastify';
import { AlertCircle, Loader, Eye, EyeOff } from 'lucide-react';

const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.password || !formData.confirmPassword) {
      setError('Please fill all required fields.');
      return;
    }
    if (!passwordPattern.test(formData.password)) {
      setError('Password must be at least 8 characters and include one uppercase letter and one number.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Confirm password must match.');
      return;
    }

    setLoading(true);
    try {
      await authService.resetPassword(token, {
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
      toast.success('Password Updated Successfully!');
      setTimeout(() => navigate('/login'), 500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[420px]">
      <div className="app-auth-card">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.36em] text-slate-400 font-semibold">Reset your password</p>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-white">Create a new password</h1>
          <p className="mt-2 text-sm text-slate-400">Secure your account by choosing a strong and memorable password.</p>
        </div>

        {error && (
          <div className="mt-6 rounded-3xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-200 shadow-sm">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 text-rose-400" size={20} />
              <p className="text-sm font-medium">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="reset-password" className="mb-2 block text-sm font-medium text-slate-300">New Password</label>
            <div className="relative">
              <input
                id="reset-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                className="app-auth-input pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="reset-confirm-password" className="mb-2 block text-sm font-medium text-slate-300">Confirm Password</label>
            <div className="relative">
              <input
                id="reset-confirm-password"
                name="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                className="app-auth-input pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((value) => !value)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-violet-600 to-sky-500 px-5 py-2.5 text-base font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading && <Loader size={20} className="animate-spin" />}
            {loading ? 'Updating...' : 'Reset Password'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-400">
          Return to{' '}
          <Link to="/login" className="font-semibold text-violet-400 hover:text-violet-300 transition">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
