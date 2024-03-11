const express = require('express');
const router = express.Router();
const User = require('../models/NewUser')
const authenticateToken = require('../middlewares/authenticateToken'); 


router.get('/tasks', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('tasks');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
});


router.post('/tasks', authenticateToken, async (req, res) => {
  const { taskName, status, dueDate, taskType, hoursBudgeted, actualHoursTaken } = req.body;
  const newTask = {
    taskName,
    status,
    dueDate,
    taskType,
    hoursBudgeted,
    actualHoursTaken
  };

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.tasks.push(newTask);
    await user.save();
    res.status(201).json(newTask);
      // Emit a  notification immediately after adding task
      global.io.emit('notification', { message: 'New Task has been added to the list' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding task', error: error.message });
  }
});


router.put('/tasks/:taskId', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const { taskId } = req.params;
    const taskIndex = user.tasks.findIndex(task => task._id.toString() === taskId);

    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const fieldsToUpdate = req.body;
    Object.keys(fieldsToUpdate).forEach(field => {
      user.tasks[taskIndex][field] = fieldsToUpdate[field];
    });

    await user.save();
    res.json(user.tasks[taskIndex]);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
});

module.exports = router;
