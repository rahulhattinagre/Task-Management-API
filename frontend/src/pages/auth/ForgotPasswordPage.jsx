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
      <div className="rounded-[2rem] border border-slate-200/70 bg-white/95 px-6 py-7 shadow-[0_30px_80px_rgba(15,23,42,0.12)] sm:px-8">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.36em] text-slate-400">Need help?</p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">Forgot Password</h1>
          <p className="mt-2 text-sm text-slate-500">Enter your email to receive a password reset link.</p>
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
            <label htmlFor="forgot-email" className="mb-2 block text-sm font-medium text-slate-700">Email address</label>
            <input
              id="forgot-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-5 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-violet-600 to-sky-500 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading && <Loader size={20} className="animate-spin" />}
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          Back to{' '}
          <Link to="/login" className="font-semibold text-violet-600 hover:text-violet-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
