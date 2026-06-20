import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { taskService } from '@/services/api';
import TaskTable from '@/components/TaskTable';
import TaskFilters from '@/components/TaskFilters';
import { Plus, AlertCircle, Loader } from 'lucide-react';

export default function TaskListPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const pageSize = 10;
  const sortBy = 'id';
  const sortDir = 'desc';

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError('');
      try {
        let response;
        if (searchKeyword) {
          response = await taskService.searchTasks(searchKeyword, page, pageSize, sortBy, sortDir);
        } else if (filterStatus) {
          response = await taskService.getTasksByStatus(filterStatus, page, pageSize, sortBy, sortDir);
        } else if (filterPriority) {
          response = await taskService.getTasksByPriority(filterPriority, page, pageSize, sortBy, sortDir);
        } else {
          response = await taskService.getTasks(page, pageSize, sortBy, sortDir);
        }
        setTasks(response.data.data.content);
        setTotalPages(response.data.data.totalPages);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [page, pageSize, sortBy, sortDir, filterStatus, filterPriority, searchKeyword]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(id);
        setTasks(tasks.filter((t) => t.id !== id));
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete task');
      }
    }
  };

  const handleClearFilters = () => {
    setFilterStatus('');
    setFilterPriority('');
    setSearchKeyword('');
    setPage(0);
  };

  return (
    <div className="animate-fade-in space-y-8">
      <div className="app-card-soft p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Tasks</h1>
            <p className="mt-2 text-gray-600">
              Manage your active work items with filters, sorting, and quick actions.
            </p>
          </div>
          <Link
            to="/tasks/create"
            className="app-button-primary !px-5"
          >
            <Plus size={20} />
            <span>New Task</span>
          </Link>
        </div>
      </div>

      <TaskFilters
        searchKeyword={searchKeyword}
        onSearchChange={setSearchKeyword}
        filterStatus={filterStatus}
        onStatusChange={setFilterStatus}
        filterPriority={filterPriority}
        onPriorityChange={setFilterPriority}
        onClearFilters={handleClearFilters}
      />


      {error && (
        <div className="rounded-3xl bg-red-50 border border-red-200 p-4 text-red-700 shadow-sm shadow-red-100">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 text-red-600" size={20} />
            <p className="text-sm font-medium">{error}</p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-96 rounded-3xl bg-white/80 border border-slate-200 shadow-sm">
          <Loader className="animate-spin text-sky-600" size={36} />
        </div>
      ) : tasks.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-12 text-center shadow-sm">
          <p className="text-gray-500 text-lg">No tasks found. Create one to get started!</p>
        </div>
      ) : (
        <>
          <TaskTable tasks={tasks} onDelete={handleDelete} />

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-gray-600">
              Page <strong>{page + 1}</strong> of <strong>{totalPages}</strong>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setPage(Math.max(0, page - 1))}
                disabled={page === 0}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                disabled={page >= totalPages - 1}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
