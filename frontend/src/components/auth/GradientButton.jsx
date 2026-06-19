import PropTypes from 'prop-types';
import { Loader2 } from 'lucide-react';

export default function GradientButton({
  children,
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  className = '',
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={
        'group inline-flex w-full items-center justify-center gap-2 rounded-\[18px\] px-5 py-3 text-sm font-semibold text-white ' +
        'shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_18px_50px_rgba(30,165,255,0.18)] ' +
        'transition duration-300 ' +
        'bg-[linear-gradient(90deg,#1EA5FF,#8B5CF6)] ' +
        'hover:scale-\[1.02\] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_24px_80px_rgba(139,92,246,0.28)] ' +
        'disabled:cursor-not-allowed disabled:opacity-60 ' +
        className
      }
    >
      {loading && <Loader2 size={18} className="animate-spin" />}
      <span>{loading ? 'Working...' : children}</span>
    </button>
  );
}

GradientButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string,
};

