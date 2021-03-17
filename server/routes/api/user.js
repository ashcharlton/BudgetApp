const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const User = require('../../models/user');
// const Brand = require('../../models/brand');
const auth = require('../../middleware/auth');
// const role = require('../../middleware/role');


router.get('/', auth, async (req, res) => {
  try {

    console.log(req.user);
    res.status(200).json({
      user: {
        id: res.user._id,
      }
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});



module.exports = router;
