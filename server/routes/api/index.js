const router = require('express').Router();

const userRoutes = require('./user');
const authRoutes = require('./auth');
const accountRoutes = require('./account');
const categoryRoutes = require('./catogory');

// user routes
router.use('/user', userRoutes);
router.use('/auth', authRoutes);
router.use('/account', accountRoutes);
router.use('/category', categoryRoutes);

module.exports = router;
