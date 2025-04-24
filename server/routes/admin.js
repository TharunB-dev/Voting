const router = require('express').Router();
const handle = require('../handlers');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Apply both auth and admin middleware for all admin routes
router.use(auth);
router.use(admin);

// Admin user management routes
router.get('/users', handle.admin.getAllUsers);
router.post('/users/premium', handle.admin.setPremiumStatus);
router.delete('/users/:userId', handle.admin.deleteUser);

module.exports = router; 