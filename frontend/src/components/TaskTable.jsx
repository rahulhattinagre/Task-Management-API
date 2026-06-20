import { Link } from 'react-router-dom';
import { Edit2, Trash2 } from 'lucide-react';
import { formatDate, getPriorityColor, getStatusColor } from '@/utils/helpers';

export default function TaskTable({ tasks, onDelete }) {
  return (
    <div className="overflow-hidden app-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse">

          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold">Title</th>
              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold">Priority</th>
              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold">Status</th>
              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold">Due Date</th>
              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {tasks.map((task) => (
              <tr key={task.id} className="transition hover:bg-slate-50/80">
                <td className="px-6 py-4 align-top text-sm text-slate-900">
                  <p className="font-semibold truncate max-w-xs">{task.title}</p>
                  {task.description && (
                    <p className="mt-1 text-xs text-slate-500 line-clamp-2">{task.description}</p>
                  )}
                </td>
                <td className="px-6 py-4 align-top text-sm">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </td>
                <td className="px-6 py-4 align-top text-sm">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-4 align-top text-sm text-slate-500">{task.dueDate ? formatDate(task.dueDate) : '—'}</td>
                <td className="px-6 py-4 align-top text-sm">
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/tasks/${task.id}/edit`}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-2 text-slate-600 transition hover:bg-slate-100"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </Link>
                    <button
                      onClick={() => onDelete(task.id)}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-2 text-rose-600 transition hover:bg-rose-50"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
