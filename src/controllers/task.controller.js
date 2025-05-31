const { Task, User } = require('../models');

// Admin: Create a task and assign it to a user
exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;

    const task = await Task.create({
      title,
      description,
      assignedTo,
      createdBy: req.user.id,
    });

    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

// Admin: Get all tasks (optionally filtered/sorted)
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ include: ['assignedUser', 'creator'] });
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

// Regular user: View only assigned tasks
exports.getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { assignedTo: req.user.id },
    });
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch your tasks' });
  }
};

// Admin: Update any task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed, assignedTo } = req.body;

    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    await task.update({ title, description, completed, assignedTo });
    res.status(200).json({ message: 'Task updated', task });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

// Admin: Delete any task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    await task.destroy();
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

// Regular user: Mark a task as complete (only if assigned)
exports.markAsComplete = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);
    if (!task || task.assignedTo !== req.user.id)
      return res.status(403).json({ error: 'Unauthorized' });

    await task.update({ completed: true });
    res.status(200).json({ message: 'Task marked as complete', task });
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark as complete' });
  }
};
