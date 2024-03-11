const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/NewUser')
const authenticateToken = require('../middlewares/authenticateToken');


router.get('/profile', authenticateToken, async (req, res) => {
  try {

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);

  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error: error.message });
  }

});

router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { firstName, lastName, designation, description } = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.userId, {
      $set: {
        firstName,
        lastName,
        designation,
        description
      }
    }, { new: true, runValidators: true, context: 'query' }); // Return the updated user document

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { password, ...result } = updatedUser.toObject();
    res.json(result);

  } catch (error) {
    res.status(500).json({ message: 'Error updating user profile', error: error.message });
  }
  
});

module.exports = router;
