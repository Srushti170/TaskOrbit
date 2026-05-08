import { useState, useEffect } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const fetchAdminData = async () => {
    try {
      const [usersRes, tasksRes] = await Promise.all([
        api.get('/users'),
        api.get('/tasks'),
      ]);
      setUsers(usersRes.data);
      setTasks(tasksRes.data);
    } catch (error) {
      toast.error('Failed to load admin data');
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleUpdate = async (taskData) => {
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask._id}`, taskData);
        toast.success('Task updated');
        setEditingTask(null);
        fetchAdminData();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Admin Action: Delete this task?')) {
      try {
        await api.delete(`/tasks/${id}`);
        toast.success('Task deleted');
        fetchAdminData();
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  return (
    <div className="mt-4 fade-in">
      <h2 className="task-title mb-4" style={{ fontSize: '1.8rem', color: 'var(--danger-color)' }}>
        Admin Dashboard
      </h2>
      
      <div className="dashboard-grid" style={{ gridTemplateColumns: 'minmax(300px, 1fr) 2fr' }}>
        <div className="task-card">
          <h3 className="task-title mb-4">Registered Users</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {users.map(user => (
              <li key={user._id} style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <strong>{user.name}</strong><br />
                  <span className="text-muted" style={{ fontSize: '0.85rem' }}>{user.email}</span>
                </div>
                <div>
                  <span className={`badge ${user.role === 'admin' ? 'badge-admin' : ''}`}>
                    {user.role}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="task-title mb-4">All Platform Tasks</h3>
          {editingTask && (
            <div className="mb-4">
              <TaskForm onSubmit={handleUpdate} initialData={editingTask} />
              <button 
                className="btn btn-danger mt-4 w-full" 
                onClick={() => setEditingTask(null)}
              >
                Cancel Edit
              </button>
            </div>
          )}

          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={handleDelete}
              onEdit={setEditingTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
