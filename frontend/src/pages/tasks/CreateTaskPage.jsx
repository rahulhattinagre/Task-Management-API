import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { taskService } from '@/services/api';
import TaskForm from '@/components/TaskForm';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export default function CreateTaskPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setError('');
    setLoading(true);
    try {
      await taskService.createTask(formData);
      navigate('/tasks', { state: { message: 'Task created successfully!' } });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <button
        onClick={() => navigate('/tasks')}
        className="inline-flex items-center gap-2 text-slate-600 transition hover:text-slate-900"
      >
        <ArrowLeft size={20} />
        <span>Back to Tasks</span>
      </button>

      <div className="rounded-3xl bg-white/95 border border-slate-200 p-8 shadow-2xl shadow-slate-900/5">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Create New Task</h1>
            <p className="mt-2 text-gray-600">Add a new task to stay on top of your work.</p>
          </div>
          <div className="rounded-3xl bg-sky-50 px-4 py-3 text-slate-700 shadow-sm shadow-sky-200/50">
            Add context, due date, and priority to keep things organized.
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-3xl bg-red-50 border border-red-200 p-4 text-red-700 shadow-sm shadow-red-100">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 text-red-600" size={20} />
              <p className="text-sm font-medium">{error}</p>
            </div>
          </div>
        )}

        <TaskForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
}
