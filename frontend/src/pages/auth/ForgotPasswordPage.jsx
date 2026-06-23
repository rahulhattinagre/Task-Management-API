import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '@/services/api';
import { toast } from 'react-toastify';
import { AlertCircle, Loader } from 'lucide-react';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please fill all required fields.');
      return;
    }
    if (!emailPattern.test(email)) {
      setError('Email is incorrect. Please enter a valid email.');
      return;
    }

    setLoading(true);
    try {
      await authService.forgotPassword({ email });
      toast.success('Email Sent Successfully!');
      setTimeout(() => navigate('/login'), 500);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to send reset link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[380px]">
      <div className="app-auth-card">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.36em] text-slate-400 font-semibold">Need help?</p>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-white">Forgot Password</h1>
          <p className="mt-2 text-sm text-slate-400">Enter your email to receive a password reset link.</p>
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
            <label htmlFor="forgot-email" className="mb-2 block text-sm font-medium text-slate-300">Email address</label>
            <input
              id="forgot-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="app-auth-input"
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-violet-600 to-sky-500 px-5 py-2.5 text-base font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading && <Loader size={20} className="animate-spin" />}
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-400">
          Back to{' '}
          <Link to="/login" className="font-semibold text-violet-400 hover:text-violet-300 transition">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
