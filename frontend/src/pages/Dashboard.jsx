import { useState, useEffect, useMemo } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import TaskStatsGrid from '../components/dashboard/TaskStatsGrid';
import TaskModal from '../components/dashboard/TaskModal';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      setIsModalOpen(false);
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

  const handleEditClick = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteAll = async () => {
    if (!tasks.length) {
      toast.info('No tasks available to delete.');
      return;
    }

    if (window.confirm('Delete all tasks? This cannot be undone.')) {
      try {
        await api.delete('/tasks');
        toast.success('All tasks deleted');
        fetchTasks();
      } catch (error) {
        toast.error('Failed to delete all tasks');
      }
    }
  };

  const today = useMemo(() => new Date(), []);
  const todayLabel = today.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
  const dueTodayCount = tasks.filter((task) => {
    if (!task.deadline) return false;
    const deadlineDate = new Date(task.deadline);
    return deadlineDate.toDateString() === today.toDateString();
  }).length;

  return (
    <div className="dashboard-layout fade-in">
      <DashboardHeader />

      <div className="dashboard-topbar">
        <div>
          <div className="page-label">Today</div>
          <h1 className="page-title">{todayLabel}</h1>
          <p className="page-metric">{tasks.length} tasks • {dueTodayCount} due today</p>
        </div>

        <div className="dashboard-actions">
          <button className="btn btn-outline" onClick={handleDeleteAll}>
            Delete All
          </button>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            + Create Task
          </button>
        </div>
      </div>

      <div className="dashboard-main-grid">
        <TaskStatsGrid
          tasks={tasks}
          onDelete={handleDelete}
          onEdit={handleEditClick}
        />
      </div>

      <TaskModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleCreateOrUpdate}
        initialData={editingTask}
      />
    </div>
  );
}

export default Dashboard;
