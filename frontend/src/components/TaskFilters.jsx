import PropTypes from 'prop-types';
import { Search, X } from 'lucide-react';

export default function TaskFilters({
  searchKeyword,
  onSearchChange,
  filterStatus,
  onStatusChange,
  filterPriority,
  onPriorityChange,
  onClearFilters,
}) {
  const hasFilters = searchKeyword || filterStatus || filterPriority;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-lg shadow-slate-900/5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1.5fr_1fr_1fr_0.95fr]">
        <div>
          <label htmlFor="task-search" className="mb-2 block text-sm font-semibold text-slate-700">Search Tasks</label>
          <div className="relative">
            <Search size={18} className="absolute left-4 top-4 text-slate-400" />
            <input
              id="task-search"
              type="text"
              value={searchKeyword}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by title or description..."
              className="w-full rounded-3xl border border-slate-300 bg-slate-50 py-3 pl-12 pr-4 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
            />
          </div>
        </div>

        <div>
          <label htmlFor="task-status-filter" className="mb-2 block text-sm font-semibold text-slate-700">Status</label>
          <select
            id="task-status-filter"
            value={filterStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
          >
            <option value="">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        <div>
          <label htmlFor="task-priority-filter" className="mb-2 block text-sm font-semibold text-slate-700">Priority</label>
          <select
            id="task-priority-filter"
            value={filterPriority}
            onChange={(e) => onPriorityChange(e.target.value)}
            className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
          >
            <option value="">All Priorities</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={onClearFilters}
            className={`w-full inline-flex items-center justify-center gap-2 rounded-3xl border px-4 py-3 text-sm font-semibold transition ${
              hasFilters
                ? 'border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200'
                : 'border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed'
            }`}
            disabled={!hasFilters}
          >
            <X size={18} />
            <span>Clear Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
}

TaskFilters.propTypes = {
  searchKeyword: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  filterStatus: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  filterPriority: PropTypes.string.isRequired,
  onPriorityChange: PropTypes.func.isRequired,
  onClearFilters: PropTypes.func.isRequired,
};
