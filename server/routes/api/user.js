const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const User = require('../../models/user');
// const Brand = require('../../models/brand');
const auth = require('../../middleware/auth');
// const role = require('../../middleware/role');


router.get('/', auth, async (req, res) => {
  try {
console.log("User", req.user);
    return res.status(200).json({
      user: {
        id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        role: req.user.role
      }
    });
  } catch (error) {
    console.log("error", error);

    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});



module.exports = router;
