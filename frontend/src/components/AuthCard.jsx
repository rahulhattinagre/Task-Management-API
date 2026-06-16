import PropTypes from 'prop-types';
import { useMemo } from 'react';

/**
 * Shared glassmorphism card used by all auth pages (Login/Register/Forgot/Reset).
 * Keeps identical dimensions and allows internal vertical scrolling when needed.
 */
export default function AuthCard({ title, subtitle, icon, children, footer }) {
  const cardId = useMemo(() => `auth-card-${Math.random().toString(16).slice(2)}`, []);

  return (
    <div className="mx-auto w-full max-w-[380px]">
      <div
        id={cardId}
        className="relative flex min-h-[560px] flex-col overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white/95 px-6 py-7 shadow-[0_30px_80px_rgba(15,23,42,0.12)] sm:px-8"
      >
        {/* Inner scroll region */}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto pr-0">
          <div className="flex items-start gap-0">
            {icon && (
              <div className="mx-auto mt-1 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-sky-500 text-white shadow-lg shadow-violet-500/20">
                {icon}
              </div>
            )}
          </div>

          <div className="mt-6 text-center">
            {title && (
              <>
                <p className="text-[11px] uppercase tracking-[0.36em] text-slate-400">{subtitle?.kicker || 'Welcome'}</p>
                <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">{title}</h1>
                {subtitle?.text && <p className="mt-2 text-sm text-slate-500">{subtitle.text}</p>}
              </>
            )}
          </div>

          {/* Main content */}
          <div className="mt-4">{children}</div>

          {/* Footer area */}
          {footer && <div className="mt-auto pt-6">{footer}</div>}
        </div>
      </div>
    </div>
  );
}

AuthCard.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.shape({
    kicker: PropTypes.string,
    text: PropTypes.string,
  }),
  icon: PropTypes.node,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

