import { Task } from '@/types';
import { WeatherBadge } from './WeatherBadge';
import { MapPin, Paperclip, Calendar, Trash2, Edit } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskCard = ({ task, onEdit, onDelete }: TaskCardProps) => {
  const statusColors = {
    PENDING: 'bg-amber-100 text-amber-800 border-amber-200',
    IN_PROGRESS: 'bg-blue-100 text-blue-800 border-blue-200',
    DONE: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  };

  const priorityColors = {
    LOW: 'bg-slate-100 text-slate-700',
    MEDIUM: 'bg-orange-100 text-orange-800',
    HIGH: 'bg-red-100 text-red-800 font-semibold',
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="font-semibold text-slate-800 text-lg line-clamp-1">{task.title}</h3>
          <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${statusColors[task.status]}`}>
            {task.status.replace('_', ' ')}
          </span>
        </div>

        {task.description && (
          <p className="text-slate-600 text-sm mb-4 line-clamp-2">{task.description}</p>
        )}

        <div className="flex flex-wrap gap-2 text-xs mb-4">
          <span className={`px-2 py-0.5 rounded ${priorityColors[task.priority]}`}>
            {task.priority} Priority
          </span>

          {task.dueDate && (
            <div className="flex items-center gap-1 text-slate-500 bg-slate-50 px-2 py-0.5 rounded border">
              <Calendar className="w-3.5 h-3.5" />
              <span>{new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
          )}

          {task.location && (
            <div className="flex items-center gap-1 text-slate-600 bg-slate-50 px-2 py-0.5 rounded border">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>{task.location}</span>
            </div>
          )}
        </div>

        <WeatherBadge weather={task.weather} />
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        {task.fileUrl ? (
          <a
            href={task.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium"
          >
            <Paperclip className="w-3.5 h-3.5" /> Attachment
          </a>
        ) : (
          <span className="text-xs text-slate-400">No file</span>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded transition"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};