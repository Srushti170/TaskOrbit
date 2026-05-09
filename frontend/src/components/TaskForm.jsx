import { useState, useEffect } from 'react';

function TaskForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    deadline: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        status: initialData.status || 'pending',
        deadline: initialData.deadline ? new Date(initialData.deadline).toISOString().slice(0, 10) : ''
      });
    } else {
      setFormData({ title: '', description: '', status: 'pending', deadline: '' });
    }
  }, [initialData]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
      setFormData({ title: '', description: '', status: 'pending', deadline: '' });
    }
  };

  return (
    <div>
      <h3 className="font-semibold mb-6" style={{ fontSize: '1.5rem' }}>
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
            placeholder="What needs to be done?"
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
            placeholder="Add details about this task..."
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
            <option value="priority">Priority</option>
            <option value="upcoming">Upcoming</option>
            <option value="in-progress">In Progress</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="input-group">
          <label className="input-label">Deadline</label>
          <input
            type="date"
            name="deadline"
            className="input-field"
            value={formData.deadline}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-full mt-4" style={{ padding: '1rem', fontSize: '1rem' }}>
          {initialData ? 'Update Task' : 'Save Task'}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
