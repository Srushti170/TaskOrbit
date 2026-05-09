import express from 'express';
import { getTasks, createTask, updateTask, deleteTask, deleteAllTasks } from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getTasks)
  .post(protect, createTask)
  .delete(protect, deleteAllTasks);

router.route('/:id')
  .put(protect, updateTask)
  .delete(protect, deleteTask);

export default router;
