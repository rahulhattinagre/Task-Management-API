import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { taskService } from '@/services/api';
import TaskForm from '@/components/TaskForm';
import { ArrowLeft, AlertCircle, Loader } from 'lucide-react';

export default function EditTaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await taskService.getTaskById(id);
        setTask(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load task');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (formData) => {
    setError('');
    setSubmitting(true);
    try {
      await taskService.updateTask(id, formData);
      navigate('/tasks', { state: { message: 'Task updated successfully!' } });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

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
            <h1 className="text-3xl font-bold text-slate-900">Edit Task</h1>
            <p className="mt-2 text-gray-600">Update task details and keep progress on track.</p>
          </div>
          <div className="rounded-3xl bg-emerald-50 px-4 py-3 text-slate-700 shadow-sm shadow-emerald-200/60">
            Currently editing: <span className="font-semibold">{task?.title}</span>
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

        {task && <TaskForm initialData={task} onSubmit={handleSubmit} loading={submitting} />}
      </div>
    </div>
  );
}
