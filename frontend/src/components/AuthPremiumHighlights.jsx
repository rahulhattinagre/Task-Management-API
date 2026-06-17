import { CalendarDays, CheckCircle2, Bell, BarChart3 } from 'lucide-react';

/**
 * Small premium feature highlights for auth forms.
 * Intentionally subtle (SaaS feel, not a big hero section).
 */
export default function AuthPremiumHighlights() {
  return (
    <div className="mt-5">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Feature highlights</p>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="group rounded-2xl border border-slate-200/70 bg-white/60 px-3 py-3 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200/80 hover:bg-white/80">
          <div className="flex items-center gap-2 text-slate-800">
            <CalendarDays size={16} className="text-sky-600" />
            <span className="text-sm font-semibold">Smart Tracking</span>
          </div>
        </div>

        <div className="group rounded-2xl border border-slate-200/70 bg-white/60 px-3 py-3 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-200/80 hover:bg-white/80">
          <div className="flex items-center gap-2 text-slate-800">
            <CheckCircle2 size={16} className="text-violet-600" />
            <span className="text-sm font-semibold">Due Reminders</span>
          </div>
        </div>

        <div className="group rounded-2xl border border-slate-200/70 bg-white/60 px-3 py-3 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200/80 hover:bg-white/80">
          <div className="flex items-center gap-2 text-slate-800">
            <Bell size={16} className="text-emerald-600" />
            <span className="text-sm font-semibold">Email Alerts</span>
          </div>
        </div>

        <div className="group rounded-2xl border border-slate-200/70 bg-white/60 px-3 py-3 shadow-sm transition hover:-translate-y-0.5 hover:border-rose-200/80 hover:bg-white/80">
          <div className="flex items-center gap-2 text-slate-800">
            <BarChart3 size={16} className="text-rose-600" />
            <span className="text-sm font-semibold">Progress Analytics</span>
          </div>
        </div>
      </div>

      {/* Animated floating icons */}
      <div className="relative mt-4 h-10 overflow-hidden">
        <div className="absolute left-0 top-0 animate-[float_7s_ease-in-out_infinite]">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-sky-200/70 bg-sky-50/70 shadow-sm">
            <CalendarDays size={18} className="text-sky-700" />
          </div>
        </div>
        <div className="absolute right-0 top-0 animate-[float_9s_ease-in-out_infinite]">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-violet-200/70 bg-violet-50/70 shadow-sm">
            <CheckCircle2 size={18} className="text-violet-700" />
          </div>
        </div>
        <div className="absolute left-10 top-2 animate-[float_8s_ease-in-out_infinite]">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-200/70 bg-emerald-50/70 shadow-sm">
            <Bell size={18} className="text-emerald-700" />
          </div>
        </div>
        <div className="absolute right-14 top-2 animate-[float_10s_ease-in-out_infinite]">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-rose-200/70 bg-rose-50/70 shadow-sm">
            <BarChart3 size={18} className="text-rose-700" />
          </div>
        </div>
      </div>
    </div>
  );
}

