var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/User");
var Student = require("../models/Student");

var userController = {};	


userController.home = function(req,res){
	res.render('index', {user : req.user});
};

userController.register = function(req, res) {
  res.render('register', {user: req.user});
};

userController.doRegister = function(req, res) {
  //if()
  User.register(new User({ name: req.body.name, username: req.body.username, studentnum: req.body.number }), req.body.password, function(err, user) {
    if (err) {
      return res.render('register',{message: 'error'});
    }
  var newstudent = new Student({name: req.body.name, number: req.body.number, time: 0});
  newstudent.save(function(err){
    if(err) throw err;
  })
    res.redirect('/')
  });
};

userController.login = function(req,res){
	res.render('login');
};

userController.doLogin = function(req, res){
	passport.authenticate('local')(req, res, function(){
		res.redirect('/');
	});
};

userController.logout = function(req,res) {
	req.logout();
	res.redirect('/');
};



module.exports = userController;