import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="relative min-h-screen overflow-y-auto bg-slate-950 text-white">
      {/* Dark blue + purple productivity gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.24),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.22),_transparent_30%)]" />

      {/* Subtle animated glows */}
      <div className="pointer-events-none absolute left-[-120px] top-[120px] h-[320px] w-[320px] rounded-full bg-violet-500/15 blur-3xl animate-[pulse_5s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute right-[-120px] top-[-80px] h-[300px] w-[300px] rounded-full bg-sky-500/15 blur-3xl animate-[pulse_6s_ease-in-out_infinite]" />

      <div className="relative min-h-screen">
        <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
          {/* Left workspace illustration (no external images) */}
          <div className="relative hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/40 to-transparent" />

            {/* Floating task cards */}
            <div className="absolute left-[10%] top-[16%] w-[260px] rounded-[1.25rem] border border-white/10 bg-white/5 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-[2px] animate-[float_7s_ease-in-out_infinite]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-sky-500/15 text-sky-200">
                    {/* Calendar */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </span>
                  <p className="text-sm font-semibold text-white/90">Today</p>
                </div>
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400/80" />
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-300">
                    {/* Check */}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="truncate">Focus time blocks</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-lg bg-sky-500/15 text-sky-200">
                    {/* Check */}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="truncate">Progress review</span>
                </div>
              </div>
            </div>

            <div className="absolute right-[12%] top-[28%] w-[280px] rounded-[1.25rem] border border-white/10 bg-white/5 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-[2px] animate-[float_9s_ease-in-out_infinite]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-violet-500/15 text-violet-200">
                    {/* People / collaboration */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </span>
                  <p className="text-sm font-semibold text-white/90">Team sync</p>
                </div>
                <div className="flex -space-x-2">
                  <span className="h-7 w-7 rounded-full border border-white/15 bg-sky-500/20" />
                  <span className="h-7 w-7 rounded-full border border-white/15 bg-violet-500/20" />
                  <span className="h-7 w-7 rounded-full border border-white/15 bg-emerald-500/20" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-white/70">
                  <span>Weekly</span>
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-sky-300/80" />
                    Active
                  </span>
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-sky-400/70 to-violet-400/70" />
                </div>
              </div>
            </div>

            {/* Project info block */}
            <div className="absolute bottom-[8%] left-[10%] max-w-[80%] space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-400 border border-sky-500/20 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
                V1.0 Live Dashboard
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-white leading-tight font-sans">
                TaskFlow Workspace
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Streamline your day, align your priorities, and keep momentum going. A premium task space designed to manage, track, and export your daily goals effortlessly.
              </p>
              <div className="pt-1 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>Real-time Sync</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  <span>PDF Exporting</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  <span>Color-coded Alerts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Auth card area */}
          <div className="relative flex min-h-screen items-center justify-center px-4 py-8">
            <div className="w-full max-w-[420px]"> <Outlet /> </div>
          </div>
        </div>
      </div>
    </div>
  );
}


