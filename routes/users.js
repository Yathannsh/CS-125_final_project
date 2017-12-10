var models  = require('../models');
var express = require('express');
var sha1 = require('sha1');
var router  = express.Router();

function handleException(res, name, error) {
	res.render(name, {
		error: error
	});
}

router.get('/', function(req, res) {
	res.render('login');
});

router.get('/users', function(req, res) {
  models.User.findAll().then(function(users) {
    res.render('index', {
      users: users
    });
  });
});

router.get('/register', function(req, res) {
	res.render('register');
});


router.post('/create', function(req, res) {
	var hash = sha1(req.body.password);
  models.User.create({
    username: req.body.username,
	name: req.body.name,
	email: req.body.email,
	password: hash
  }).then(function(user, created){	  
	 handleException(res, 'register', 'You have been registered successfully. Please login.');
  }).catch(function(err){
	  console.log('Error occured', err);
	  handleException(res, 'register', 'Error: '+err.errors[0].message);
  });
});

router.post('/auth', function(req, res) {
	var hash = sha1(req.body.password);
  models.User.findOne({
    where: { 
		username: req.body.username,
		password: hash,
	}
  }).then(function(user, created){
	  if(user) {
		res.redirect('/users');
	  } else {
		handleException(res, 'login', 'Invalid username or password ');
	  }
  }).catch(function(err){
	  console.log('Error occured', err);
	  handleException(res, 'login', err.errors[0].message);
  });
});



module.exports = router;
