import { useState, useEffect } from 'react';

function TaskForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending'
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        status: initialData.status || 'pending'
      });
    } else {
      setFormData({ title: '', description: '', status: 'pending' });
    }
  }, [initialData]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
      setFormData({ title: '', description: '', status: 'pending' });
    }
  };

  return (
    <div className="task-card" style={{ position: 'sticky', top: '100px' }}>
      <h3 className="task-title mb-4">
        {initialData ? 'Edit Task' : 'Create New Task'}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label">Title</label>
          <input
            type="text"
            name="title"
            className="input-field"
            value={formData.title}
            onChange={onChange}
            required
          />
        </div>
        <div className="input-group">
          <label className="input-label">Description</label>
          <textarea
            name="description"
            className="input-field"
            value={formData.description}
            onChange={onChange}
            rows="4"
            required
          />
        </div>
        <div className="input-group">
          <label className="input-label">Status</label>
          <select
            name="status"
            className="input-field"
            value={formData.status}
            onChange={onChange}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-full mt-4">
          {initialData ? 'Update Task' : 'Add Task'}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
