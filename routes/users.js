var express = require('express');
var router = express.Router();
var User = require('../modles/User')
var userService = require('../services/user');
/* GET users listing. */
router.get('/', userService.checkToken, function(req, res, next) {
  User.find(function(err, users){
    if (err) return next(err);
    res.json(users);
  })
  // res.send('respond with a resource');
});

router.post('/register', register);
router.post('/login', authenticate);


function register(req, res, next) {
  userService.create(req.body)
      .then((ret) => {
        console.log({ret})
        res.json({...ret})
      })
      .catch(err =>{ 
        console.log({err})
        next(err)
      });
}

function authenticate(req, res, next) {
  userService.authenticate(req.body)
      .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
      .catch(err => next(err));
}
module.exports = router;
