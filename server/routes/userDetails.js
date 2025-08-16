const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/user/details/:id
router.get('/details/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Find user by ID
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Return user details
    res.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar || '',
        role: user.role,
        specialization: user.specialization || '',
        experience: user.experience || 0,
        isDietician: user.role === 'dietician'
      }
    });
    
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;