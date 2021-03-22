const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const User = require('../../models/user');
const Account = require('../../models/Account');
const AccountType = require('../../models/AccountType');
const auth = require('../../middleware/auth');
const { route } = require('./user');
// const role = require('../../middleware/role');


router.post('/', auth, async (req, res) => {
  try {
    const name = req.body.name;
    const type = req.body.type;
    const user = req.user._id;

    if(!name){
        return res.status(400).json({ error: 'You must enter a name.' });
    }
    
    if(!type){
        return res.status(400).json({error: 'You must choose a type.'});
    }

    const accountType = AccountType.findOne({
        type: type
    }, 
    (err, accountType) => {
        if(!accountType){
            return res.status(400).json({
                error: 'Ther is no such type'
            })
        }

        var account = new Account({
            name: name,
            type: accountType._id,
            user: user
        });

        
      account.save(async err => {
        if (err) {
          return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
          });
        }
        res.status(200).json({
          success: true,
          message:
            'Account created'
        });
      });
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.put('/', auth, async (req, res) => {
  try {
    const id = req.body.accountId;
    const name = req.body.name;
    const type = req.body.type;

    let account = Account.findById(id, (err, account) => {
      if(!account){
        return res.status(404).json({
          error: `Cannot find account with id ${id}`
        });
      }


    if(type){
      const accountType = AccountType.findOne({
        type: type
      }, 
      (err, accountType) => {
          if(!accountType){
              return res.status(400).json({
                  error: 'There is no such type'
              })
          }
  
          if(name){
            account.name = name;
          }

          account.type = AccountType._id;
  
          account.save(async err => {
            if (err) {
              return res.status(400).json({
                error: 'Your request could not be processed. Please try again.'
              });
            }
            res.status(200).json({
              success: true,
              message:
                'Account updated'
            });
          });
        });
      }else{
        account.name = name;
        account.save(async err => {
          if(err){
            return res.status(400).json({
              error: 'Your request could not be processed. Please try again.'
            })
          }

          res.status(200).json({
            success: true,
            message:
              'Account updated'
          }); 
        })
      }
    })
    

  
  } catch (error) {
    console.log(error);

    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    console.log("getting accounts")
    const accounts = Account.find({
        user: req.user._id
    }, 
    (err, accounts) => {
        res.status(200).json({
          success: true,
          accounts
        });
      });
 
  } catch (error) {
    console.log(error);

    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.put('/selected', auth, async (req, res) => {
  try {
    const accounts = Account.find({
        user: req.user._id
    }, 
    (err, accounts) => {

      accounts.map(a => {
        a.selected = req.body.account.id == a._id;
      });

      const unselectRes = Account.updateMany({selected: true}, {selected: false}, null, (err, updateManyRes) => {
        Account.updateOne({_id: req.body.account.id}, {selected: true}, null, (err, updateRes) => {
          console.log(updateRes.n);
          console.log(req.body);
          return res.status(200).json({
            success: true,
            account: req.body.account
          });
        })
      });
    })
 
  } catch (error) {
    console.log(error);

    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});



module.exports = router;
