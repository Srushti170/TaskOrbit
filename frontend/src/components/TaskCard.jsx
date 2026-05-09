import { FiEdit2, FiTrash2, FiClock, FiCalendar } from 'react-icons/fi';

function TaskCard({ task, onDelete, onEdit }) {
  const isCompleted = task.status === 'completed';
  const deadline = task.deadline ? new Date(task.deadline) : null;
  const isOverdue = deadline && deadline < new Date() && task.status !== 'completed';

  return (
    <div className={`widget-card fade-in ${isCompleted ? 'glass' : ''}`} style={{ padding: '1.5rem', outline: isCompleted ? '1px solid rgba(0,0,0,0.05)' : '' }}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold" style={{ fontSize: '1.125rem', textDecoration: isCompleted ? 'line-through' : 'none', opacity: isCompleted ? 0.6 : 1 }}>
            {task.title}
          </h3>
          {deadline && (
            <div className={`task-deadline ${isOverdue ? 'overdue' : ''}`}>
              <FiCalendar size={14} />
              <span>{deadline.toLocaleDateString()}</span>
              {isOverdue && <span className="deadline-badge">Overdue</span>}
            </div>
          )}
        </div>
        <span 
          className="text-xs font-semibold px-3 py-1 rounded-full" 
          style={{ 
            background:
              task.status === 'completed' ? '#d1fae5' :
              task.status === 'in-progress' ? '#dbeafe' :
              task.status === 'priority' ? '#fee2e2' :
              task.status === 'upcoming' ? '#ede9fe' :
              '#fef3c7',
            color:
              task.status === 'completed' ? '#065f46' :
              task.status === 'in-progress' ? '#1e40af' :
              task.status === 'priority' ? '#b91c1c' :
              task.status === 'upcoming' ? '#5b21b6' :
              '#92400e'
          }}
        >
          {task.status.replace('-', ' ').toUpperCase()}
        </span>
      </div>
      
      <p className="text-muted mb-4 text-sm" style={{ opacity: isCompleted ? 0.6 : 1 }}>
        {task.description}
      </p>
      
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2 text-xs text-muted">
          <FiClock />
          <span>{new Date(task.createdAt).toLocaleDateString()}</span>
          {task.createdBy?.name && (
            <span className="ml-2 font-medium">• By {task.createdBy.name.split(' ')[0]}</span>
          )}
        </div>
        
        <div className="flex gap-2">
          <button onClick={() => onEdit(task)} className="btn-icon">
            <FiEdit2 size={16} />
          </button>
          <button onClick={() => onDelete(task._id)} className="btn-icon" style={{ color: '#ef4444' }}>
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
