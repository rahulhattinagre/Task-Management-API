import '@/styles/index.css';

export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

export const formatDateTime = (datetime) => {
  if (!datetime) return '';
  const d = new Date(datetime);
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const isTaskOverdue = (dueDate, status) => {
  if (status === 'COMPLETED' || !dueDate) return false;
  return new Date(dueDate) < new Date();
};

export const getPriorityColor = (priority) => {
  const colors = {
    HIGH: 'bg-red-100 text-red-800',
    MEDIUM: 'bg-yellow-100 text-yellow-800',
    LOW: 'bg-green-100 text-green-800',
  };
  return colors[priority] || 'bg-gray-100 text-gray-800';
};

export const getStatusColor = (status) => {
  const colors = {
    PENDING: 'bg-gray-100 text-gray-800',
    IN_PROGRESS: 'bg-blue-100 text-blue-800',
    COMPLETED: 'bg-green-100 text-green-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

export const getStatusIcon = (status) => {
  const icons = {
    PENDING: '⏳',
    IN_PROGRESS: '⚙️',
    COMPLETED: '✅',
  };
  return icons[status] || '•';
};
