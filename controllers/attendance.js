var mongoose = require("mongoose");

var attendance = {};

attendance.student = function (req,res){
	res.send('list attendance');
}

attendance.time = function(req,res){
	var date = req.body.date;
	var d1 = new Date(date + " "+ req.body.timeout);
	var d2 = new Date(date + " "+ req.body.timein)
	var diff=(d1.getTime()-d2.getTime())/60000;
	console.log("time"+ diff);
	res.redirect('/');
}

attendance.add = function(req,res){
  res.render('newstudent',{user : req.user});
}

attendance.doAdd = function(req,res){
  res.redirect('/');
}

attendance.view = function(req,res){
	res.render('view',{user : req.user})
}


module.exports = attendance;