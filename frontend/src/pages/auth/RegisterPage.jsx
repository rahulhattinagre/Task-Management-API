import { useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '@/services/api';
import { toast } from 'react-toastify';
import { AlertCircle, Eye, EyeOff, Loader, UserPlus } from 'lucide-react';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

const getPasswordStrength = (password) => {
  if (!password) return { label: 'Empty', level: 0 };
  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  const score = [hasLength, hasUpper, hasNumber, hasSymbol].filter(Boolean).length;

  if (score <= 1) return { label: 'Weak', level: 1 };
  if (score === 2 || score === 3) return { label: 'Medium', level: 2 };
  return { label: 'Strong', level: 3 };
};

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const passwordStrength = useMemo(
    () => getPasswordStrength(formData.password),
    [formData.password]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill all required fields.');
      return false;
    }
    if (!emailPattern.test(formData.email)) {
      setError('Email is incorrect. Please enter a valid email.');
      return false;
    }
    if (!passwordPattern.test(formData.password)) {
      setError('Password must be at least 8 characters and include one uppercase letter and one number.');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Confirm password must match.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);

    try {
      const data = { ...formData };
      delete data.confirmPassword;
      await authService.register(data);
      toast.success('Account Created Successfully!');
      setTimeout(() => navigate('/login'), 500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[390px]">
      <div className="app-auth-card px-5 py-5 sm:px-6">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-sky-500 text-white shadow-lg shadow-violet-500/20">
          <UserPlus size={20} />
        </div>

        <div className="mt-4 text-center">
          <p className="text-[10px] uppercase tracking-[0.36em] text-slate-400 font-medium">Get started</p>
          <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-white">Create account</h1>
          <p className="mt-1 text-xs text-slate-400">Join TaskFlow and start managing your tasks.</p>
        </div>

        {error && (
          <div className="mt-4 rounded-3xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-rose-200 shadow-sm">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="mt-0.5 text-rose-400 shrink-0" size={18} />
              <p className="text-xs font-medium leading-normal">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
          <div>
            <label htmlFor="register-name" className="mb-1 block text-xs font-semibold text-slate-300">Full name</label>
            <input
              id="register-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="app-auth-input"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="register-email" className="mb-1 block text-xs font-semibold text-slate-300">Email address</label>
            <input
              id="register-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="app-auth-input"
              placeholder="you@example.com"
            />
          </div>

          <div className="grid gap-3.5 sm:grid-cols-2">
            <div>
              <label htmlFor="register-password" className="mb-1 block text-xs font-semibold text-slate-300">Password</label>
              <div className="relative">
                <input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="app-auth-input pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="register-confirm-password" className="mb-1 block text-xs font-semibold text-slate-300">Confirm password</label>
              <div className="relative">
                <input
                  id="register-confirm-password"
                  type={showConfirm ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="app-auth-input pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-3xl bg-gradient-to-r from-sky-500 to-violet-500 px-5 py-2.5 text-base font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 mt-2"
          >
            {loading && <Loader size={18} className="animate-spin" />}
            <span>{loading ? 'Creating account...' : 'Create account'}</span>
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-sky-400 hover:text-sky-300 transition">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
