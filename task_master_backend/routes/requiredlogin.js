const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/NewUser')


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
    res.json({ token });
    scheduleNotifications(user._id);
    
  } catch (error) {
    res.status(500).json({ message: 'Error in login', error: error.message });
  }
});

function scheduleNotifications(userId) {
    setTimeout(() => {
      emitNotification(userId, 'Welcome back!');
    }, 3000); 
  
    setTimeout(() => {
      emitNotification(userId, 'Take a look at website.');
    }, 8000); 
  
    setTimeout(() => {
      emitNotification(userId, 'Tasks are there for you to complete.');
    }, 18000); 
  }
  
  function emitNotification(userId, message) {
    global.io.to(userId.toString()).emit('notification', { message });
  }

module.exports = router;
