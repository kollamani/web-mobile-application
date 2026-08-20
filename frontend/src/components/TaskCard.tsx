import { Task, TaskStatus, TaskPriority } from '@/types';

const STATUS_COLORS: Record<TaskStatus | string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  IN_PROGRESS: 'bg-blue-100 text-blue-800',
  DONE: 'bg-green-100 text-green-800',
};

const PRIORITY_COLORS: Record<TaskPriority | string, string> = {
  LOW: 'bg-gray-100 text-gray-800',
  MEDIUM: 'bg-orange-100 text-orange-800',
  HIGH: 'bg-red-100 text-red-800',
};

export function TaskCard({ task }: { task: Task }) {
  const statusColor = STATUS_COLORS[task.status] || 'bg-gray-100 text-gray-800';
  const priorityColor = task.priority ? (PRIORITY_COLORS[task.priority] || 'bg-gray-100 text-gray-800') : '';

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h3 className="text-lg font-bold">{task.title}</h3>
      <p className="text-gray-600">{task.description || 'No description provided.'}</p>
      
      <div className="flex gap-2 mt-2">
        <span className={`px-2 py-1 rounded text-xs ${statusColor}`}>
          {task.status}
        </span>
        {task.priority && (
          <span className={`px-2 py-1 rounded text-xs ${priorityColor}`}>
            {task.priority}
          </span>
        )}
      </div>
    </div>
  );
}