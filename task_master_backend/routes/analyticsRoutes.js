const express = require('express');
const router = express.Router();
const User = require('../models/NewUser')
const authenticateToken = require('../middlewares/authenticateToken');
// const authenticateToken = require('../middleware/authenticateToken');
// const User = require('../models/User');

// Analytics route
router.get('/analytics', authenticateToken, async (req, res) => {
  try {
    // Find the logged-in user by ID stored in req.userId
    const user = await User.findById(req.userId).exec();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Extract projects info
    const projectsAnalytics = user.projects.map(project => ({
      projectName: project.projectName,
      estimationTime: project.estimationTime,
      actualTime: project.actualTime
    }));

    // Count task statuses
    const taskStatusCounts = user.tasks.reduce((acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
      }, {});
  
      res.json({
        projects: projectsAnalytics,
        tasks: {
          pending: taskStatusCounts['pending'] || 0,
          inProgress: taskStatusCounts['in-progress'] || 0,
          completed: taskStatusCounts['completed'] || 0,
        },
      });
    } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics', error: error.message });
  }
});

module.exports = router;
