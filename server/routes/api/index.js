const router = require('express').Router();

const userRoutes = require('./user');
const authRoutes = require('./auth');
const accountRoutes = require('./account');

// user routes
router.use('/user', userRoutes);
router.use('/auth', authRoutes);
router.use('/account', accountRoutes);

module.exports = router;
