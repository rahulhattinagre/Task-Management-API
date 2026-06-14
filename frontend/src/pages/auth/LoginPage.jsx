import { useState } from 'react';

import { useNavigate, Link } from 'react-router-dom';
import { authService } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-toastify';
import { AlertCircle, Eye, EyeOff, Loader, ArrowRightCircle } from 'lucide-react';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Please fill all required fields.');
      return false;
    }
    if (!emailPattern.test(formData.email)) {
      setError('Email is incorrect. Please enter a valid email.');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters.');
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
      const response = await authService.login(formData);
      const { data } = response.data;
      login(data, data.token);



      toast.success('Login Successful!');
      setTimeout(() => navigate('/dashboard'), 500);
    } catch (err) {
      const status = err.response?.status;
      const message = err.response?.data?.message;

      if (status === 401) {
        setError('Incorrect password. Please try again.');
      } else if (status === 400 && message?.toLowerCase().includes('email')) {
        setError('Email is incorrect. Please enter a valid email.');
      } else {
        setError(message || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[380px]">
      <div className="rounded-[2rem] border border-slate-200/70 bg-white/95 px-6 py-7 shadow-[0_30px_80px_rgba(15,23,42,0.12)] sm:px-8">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-sky-500 text-white shadow-lg shadow-violet-500/20">
            <ArrowRightCircle size={24} />
          </div>
          <p className="text-[11px] uppercase tracking-[0.36em] text-slate-400">Welcome back</p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">Sign in</h1>
          <p className="mt-2 text-sm text-slate-500">Sign in to continue to your task workspace.</p>
        </div>

        {error && (
          <div className="mt-6 rounded-3xl border border-rose-200 bg-rose-50 p-4 text-rose-700 shadow-sm">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 text-rose-600" size={20} />
              <p className="text-sm font-medium">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
          <div>
            <label htmlFor="login-email" className="mb-2 block text-sm font-medium text-slate-700">Email address</label>
            <input
              id="login-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-5 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-sm font-medium text-slate-700">
              <label htmlFor="login-password">Password</label>
            </div>
            <div className="relative mt-2">
              <input
                id="login-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-5 py-3 pr-12 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-slate-500">
            <Link to="/forgot-password" className="font-semibold text-sky-600 hover:text-sky-500">
              Forgot password?
            </Link>
          </div>


          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-violet-600 to-sky-500 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading && <Loader size={20} className="animate-spin" />}
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          Don’t have an account?{' '}
          <Link to="/register" className="font-semibold text-violet-600 hover:text-violet-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
