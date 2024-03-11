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
    scheduleNotifications();
    
  } catch (error) {
    res.status(500).json({ message: 'Error in login', error: error.message });
  }
});

function scheduleNotifications() {
    setTimeout(() => {
      emitNotification('👋 Welcome back!');
    }, 3000); //3seconds
  
    // setTimeout(() => {
    //   emitNotification('Take a look at website.');
    // }, 10000); //10seconds
  
    // setTimeout(() => {
    //   emitNotification('Tasks are there for you to complete.');
    // }, 18000); //18seconds
  }
  
  function emitNotification(message) {
    global.io.emit('notification', { message });
  }

module.exports = router;
