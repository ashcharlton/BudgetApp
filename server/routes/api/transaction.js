const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const Category = require('../../models/category');
const auth = require('../../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const name = req.body.name;
    const outgoing = req.body.outgoing;

    console.log("Name", name);

    if(!name){
        return res.status(400).json({ error: 'You must enter a name.' });
    }

    console.log("Outgoing", outgoing);
    
    if(outgoing === null || outgoing === undefined){
        return res.status(400).json({error: 'You must choose if the category is outgoing.'});
    }

    var category = new Category({
        name,
        outgoing
    });

    category.save(async err => {
      if (err) {
        return res.status(400).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }
      res.status(200).json({
        success: true,
        message:
          'Category created'
      });
    });
  
  } catch (error) {
    console.log(error);

    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const categories = Category.find({}, (err, cats) => {

      if(!categories){
        return res.status(404).json({error: 'No categories found'});
      }
  
      console.log(cats)
  
      return res.status(200).json({data: cats});
    });
    
 
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'Your request could not be processed. Please try again.',
      message: error
    });
  }
});

module.exports = router;
