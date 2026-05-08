import { FiEdit2, FiTrash2 } from 'react-icons/fi';

function TaskCard({ task, onDelete, onEdit }) {
  const statusClass = `status-${task.status}`;

  return (
    <div className="task-card fade-in">
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <span className={`task-status ${statusClass}`}>
          {task.status.replace('-', ' ')}
        </span>
      </div>
      <p className="text-muted mb-4">{task.description}</p>
      
      {task.createdBy && task.createdBy.name && (
        <div className="mb-4">
          <small className="text-muted">By: {task.createdBy.name}</small>
        </div>
      )}

      <div className="flex justify-between items-center mt-4">
        <small className="text-muted">
          {new Date(task.createdAt).toLocaleDateString()}
        </small>
        <div className="flex" style={{ gap: '0.5rem' }}>
          <button onClick={() => onEdit(task)} className="btn style={{ padding: '0.5rem' }}">
            <FiEdit2 />
          </button>
          <button onClick={() => onDelete(task._id)} className="btn btn-danger" style={{ padding: '0.5rem' }}>
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
