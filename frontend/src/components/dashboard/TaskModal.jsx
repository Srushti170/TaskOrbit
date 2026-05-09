import { useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import TaskForm from '../TaskForm';

function TaskModal({ isOpen, onClose, onSubmit, initialData }) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <FiX />
        </button>
        <div style={{ marginTop: '1rem' }}>
          <TaskForm 
            initialData={initialData} 
            onSubmit={(data) => {
              onSubmit(data);
              onClose();
            }} 
          />
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
