import PropTypes from 'prop-types';

const colorClasses = {
  blue: 'from-sky-50 via-white to-slate-50 border-sky-200 text-sky-700 shadow-sky-100',
  gray: 'from-slate-50 via-white to-slate-50 border-slate-200 text-slate-700 shadow-slate-100',
  yellow: 'from-amber-50 via-white to-slate-50 border-amber-200 text-amber-700 shadow-amber-100',
  green: 'from-emerald-50 via-white to-slate-50 border-emerald-200 text-emerald-700 shadow-emerald-100',
  red: 'from-rose-50 via-white to-slate-50 border-rose-200 text-rose-700 shadow-rose-100',
};

export default function DashboardCard({ title, count, color, icon }) {
  const colorClass = colorClasses[color] || colorClasses.blue;

  return (
    <div className={`rounded-3xl border p-6 bg-gradient-to-br ${colorClass} transition hover:-translate-y-1 hover:shadow-2xl`}> 
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] opacity-80">{title}</p>
          <p className="mt-5 text-4xl font-bold tracking-tight">{count}</p>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/80 text-3xl shadow-sm shadow-slate-200">
          {icon}
        </div>
      </div>
    </div>
  );
}

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  color: PropTypes.string,
  icon: PropTypes.node.isRequired,
};
