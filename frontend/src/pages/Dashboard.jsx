import { useState, useEffect } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (error) {
      toast.error('Failed to load tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateOrUpdate = async (taskData) => {
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask._id}`, taskData);
        toast.success('Task updated');
        setEditingTask(null);
      } else {
        await api.post('/tasks', taskData);
        toast.success('Task created');
      }
      fetchTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/tasks/${id}`);
        toast.success('Task deleted');
        fetchTasks();
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  return (
    <div className="dashboard-grid">
      <div>
        <TaskForm onSubmit={handleCreateOrUpdate} initialData={editingTask} />
      </div>
      <div>
        <h2 className="task-title mb-4" style={{ fontSize: '1.5rem' }}>My Tasks</h2>
        {tasks.length === 0 ? (
          <p className="text-muted">No tasks found. Create one to get started!</p>
        ) : (
          <div>
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={handleDelete}
                onEdit={setEditingTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
