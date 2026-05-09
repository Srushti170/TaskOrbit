import Task from '../models/Task.js';

// @desc    Get tasks
// @route   GET /api/tasks
// @access  Private
export const getTasks = async (req, res, next) => {
  try {
    let tasks;
    if (req.user.role === 'admin') {
      tasks = await Task.find({}).populate('createdBy', 'name email');
    } else {
      tasks = await Task.find({ createdBy: req.user._id });
    }
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// @desc    Create task
// @route   POST /api/tasks
// @access  Private
export const createTask = async (req, res, next) => {
  try {
    const { title, description, status, deadline } = req.body;

    const task = new Task({
      title,
      description,
      status: status || 'pending',
      deadline: deadline ? new Date(deadline) : undefined,
      createdBy: req.user._id,
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) {
    next(error);
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (task) {
      // Check for user or admin
      if (task.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        res.status(401);
        throw new Error('User not authorized');
      }

      task.title = req.body.title || task.title;
      task.description = req.body.description || task.description;
      task.status = req.body.status || task.status;
      task.deadline = req.body.deadline ? new Date(req.body.deadline) : task.deadline;

      const updatedTask = await task.save();
      res.json(updatedTask);
    } else {
      res.status(404);
      throw new Error('Task not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (task) {
      // Check for user or admin
      if (task.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        res.status(401);
        throw new Error('User not authorized');
      }

      await task.deleteOne();
      res.json({ message: 'Task removed' });
    } else {
      res.status(404);
      throw new Error('Task not found');
    }
  } catch (error) {
    next(error);
  }
};

export const deleteAllTasks = async (req, res, next) => {
  try {
    if (req.user.role === 'admin') {
      await Task.deleteMany({});
    } else {
      await Task.deleteMany({ createdBy: req.user._id });
    }
    res.json({ message: 'All tasks removed' });
  } catch (error) {
    next(error);
  }
};
