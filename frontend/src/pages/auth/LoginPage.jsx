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
      <div className="app-auth-card">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-sky-500 text-white shadow-lg shadow-violet-500/20">
            <ArrowRightCircle size={24} />
          </div>
          <p className="text-[11px] uppercase tracking-[0.36em] text-slate-400">Welcome back</p>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-white">Sign in</h1>
          <p className="mt-2 text-sm text-slate-400">Sign in to continue to your task workspace.</p>
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
            <label htmlFor="login-email" className="mb-2 block text-sm font-medium text-slate-300">Email address</label>
            <input
              id="login-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="app-auth-input"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="login-password" className="mb-2 block text-sm font-medium text-slate-300">Password</label>
            <div className="relative">
              <input
                id="login-password"
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

          <div className="flex items-center justify-between text-sm">
            <Link to="/forgot-password" className="font-semibold text-sky-400 hover:text-sky-300 transition">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-violet-600 to-sky-500 px-5 py-2.5 text-base font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading && <Loader size={20} className="animate-spin" />}
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-400">
          Don’t have an account?{' '}
          <Link to="/register" className="font-semibold text-violet-400 hover:text-violet-300 transition">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
