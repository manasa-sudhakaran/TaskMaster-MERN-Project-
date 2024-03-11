const express = require('express');
const router = express.Router();
const User = require('../models/NewUser')
const authenticateToken = require('../middlewares/authenticateToken');


router.get('/projects', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('projects');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
});


router.post('/projects', authenticateToken, async (req, res) => {
  const { projectName, clientName, projectDescription, estimationTime, actualTime, toolsUsed, additionalInformation, tasks } = req.body;
  const newProject = {
    projectName,
    clientName,
    projectDescription,
    estimationTime,
    actualTime,
    toolsUsed,
    additionalInformation,
    tasks
  };

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.projects.push(newProject);
    await user.save();
    res.status(201).json(newProject);
    // Emit a add project notification immediately after adding project
    global.io.emit('notification', { message: 'New Project has been added to the project list' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding project', error: error.message });
  }
});


router.put('/projects/:projectId', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const { projectId } = req.params;
    const projectIndex = user.projects.findIndex(project => project._id.toString() === projectId);

    if (projectIndex === -1) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const fieldsToUpdate = req.body;
    Object.keys(fieldsToUpdate).forEach(field => {
      user.projects[projectIndex][field] = fieldsToUpdate[field];
    });

    await user.save();
    res.json(user.projects[projectIndex]);
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error: error.message });
  }
});

module.exports = router;
