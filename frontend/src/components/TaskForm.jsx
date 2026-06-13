import PropTypes from 'prop-types';
import { useState } from 'react';
import { Loader } from 'lucide-react';
import { formatDate } from '@/utils/helpers';

export default function TaskForm({ initialData, onSubmit, loading }) {
  const [formData, setFormData] = useState(
    initialData || {
      title: '',
      description: '',
      priority: 'MEDIUM',
      status: 'PENDING',
      dueDate: '',
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="task-title" className="mb-2 block text-sm font-semibold text-slate-700">Title *</label>
        <input
          id="task-title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter task title..."
          className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-5 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
        />
      </div>

      <div>
        <label htmlFor="task-description" className="mb-2 block text-sm font-semibold text-slate-700">Description</label>
        <textarea
          id="task-description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter task description..."
          rows="4"
          className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-5 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 resize-none"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label htmlFor="task-priority" className="mb-2 block text-sm font-semibold text-slate-700">Priority *</label>
          <select
            id="task-priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            required
            className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <div>
          <label htmlFor="task-status" className="mb-2 block text-sm font-semibold text-slate-700">Status *</label>
          <select
            id="task-status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
          >
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        <div>
          <label htmlFor="task-duedate" className="mb-2 block text-sm font-semibold text-slate-700">Due Date</label>
          <input
            id="task-duedate"
            type="date"
            name="dueDate"
            value={formData.dueDate ? formatDate(formData.dueDate) : ''}
            onChange={handleChange}
            className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
          />
        </div>
      </div>

      <div className="pt-6">
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-3 rounded-3xl bg-gradient-to-r from-sky-500 to-violet-500 px-5 py-3 text-white text-base font-semibold shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {loading && <Loader size={20} className="animate-spin" />}
          <span>{loading ? 'Saving...' : 'Save Task'}</span>
        </button>
      </div>
    </form>
  );
}

TaskForm.propTypes = {
  initialData: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    priority: PropTypes.string,
    status: PropTypes.string,
    dueDate: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

TaskForm.defaultProps = {
  initialData: null,
  loading: false,
};
