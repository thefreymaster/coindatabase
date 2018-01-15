var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:xbox@ds253587.mlab.com:53587/coindatabase', ['holdings'])

// console.log(db);
//Get ALL account information for all users NOT FOR PRODUCTION
router.get('/account/all', function(req, res, next){
     db.account.find(function(err, account){
          if(err){
               res.send(error)
          }
          res.json(account);
     })
})

//GET USERS INFO FOR ID, used for on load to get data to store in cryptoObject
router.get('/account/:id', function(req, res, next){
    db.account.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, account){
         if(err){
              res.send(error)
         }
         res.json(account);
    })
})


//Save New Account
router.post('/account/new', function(req, res, next){
    var account = req.body;
    console.log(account);
         db.account.save(account, function(err, account){
              if(err){
                   res.send(error)
              }
              res.json(account);
         })
})

//delete account
router.delete('/account/delete/:id', function(req, res, next){
    db.account.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, account){
         if(err){
              res.send(error)
         }
         res.json(account);
    })
})

//update (adding new holding/tracking, removing submit entire json object)
router.put('/account/update/:id', function(req, res, next){
    var account = req.body;
    console.log(account);

    db.account.update({_id: mongojs.ObjectId(req.params.id)}, account, {}, function(err, account){
        if(err){
             res.send(account)
        }
        res.json(account);
   })
})

module.exports = router;