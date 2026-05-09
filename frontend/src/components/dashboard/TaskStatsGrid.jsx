import TaskCard from '../TaskCard';

function TaskStatsGrid({ tasks, onDelete, onEdit }) {
  const categories = [
    { key: 'priority', title: 'Priority', description: 'Highest urgency', badge: 'priority' },
    { key: 'upcoming', title: 'Upcoming', description: 'Next scheduled items', badge: 'upcoming' },
    { key: 'in-progress', title: 'In Progress', description: 'Tasks being worked on', badge: 'in-progress' },
    { key: 'pending', title: 'Pending', description: 'Backlog and future work', badge: 'pending' },
    { key: 'completed', title: 'Completed', description: 'Finished tasks', badge: 'completed' },
  ];

  const getTasksForCategory = (key) => tasks.filter((task) => task.status === key);

  return (
    <div className="widget-card task-board">
      <div className="widget-header task-board-header">
        <div>
          <h2 className="font-semibold page-title">Task Board</h2>
          <p className="text-muted page-subtitle">A clean overview of every task by status.</p>
        </div>
        <span className="text-muted">{tasks.length} tasks</span>
      </div>

      <div className="task-board-grid">
        {categories.map((category) => {
          const categoryTasks = getTasksForCategory(category.key);

          return (
            <div key={category.key} className={`status-column ${category.key}`}>
              <div className="status-column-header">
                <div>
                  <div className="status-title">{category.title}</div>
                  <div className="status-subtitle">{category.description}</div>
                </div>
                <span className="status-count">{categoryTasks.length}</span>
              </div>

              <div className="status-task-list">
                {categoryTasks.length > 0 ? (
                  categoryTasks.map((task) => (
                    <TaskCard key={task._id} task={task} onDelete={onDelete} onEdit={onEdit} />
                  ))
                ) : (
                  <p className="text-muted status-empty">No tasks in this category.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TaskStatsGrid;
