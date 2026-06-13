import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.18),_transparent_20%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-24 h-80 bg-gradient-to-b from-white/10 to-transparent blur-3xl" />
      <div className="relative flex min-h-screen items-center justify-center px-4 py-8">
        <div className="w-full max-w-[400px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
