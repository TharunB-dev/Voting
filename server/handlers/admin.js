const db = require('../models');

// Get all users (admin only)
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await db.User.find().select('-password');
    return res.status(200).json(users);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

// Set user premium status (admin only)
exports.setPremiumStatus = async (req, res, next) => {
  try {
    const { userId, isPremium, role } = req.body;
    
    if (!userId) {
      throw new Error('User ID is required');
    }
    
    const user = await db.User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    // Update user premium status and role
    if (isPremium !== undefined) {
      user.isPremium = isPremium;
    }
    
    if (role && ['user', 'premium', 'admin'].includes(role)) {
      user.role = role;
    }
    
    await user.save();
    
    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        isPremium: user.isPremium,
        role: user.role
      }
    });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

// Delete user (admin only)
exports.deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      throw new Error('User ID is required');
    }
    
    const user = await db.User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    // Delete all polls created by this user
    await db.Poll.deleteMany({ user: userId });
    
    // Remove this user from the voted array in all polls
    const polls = await db.Poll.find({ voted: userId });
    for (let poll of polls) {
      poll.voted = poll.voted.filter(id => id.toString() !== userId);
      await poll.save();
    }
    
    // Delete the user
    await user.remove();
    
    return res.status(200).json({
      success: true,
      message: 'User and associated data deleted successfully'
    });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
}; 