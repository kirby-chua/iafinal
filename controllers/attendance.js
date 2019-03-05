var mongoose = require("mongoose");

var attendance = {};

attendance.student = function (req,res){
	res.send('list attendance');
}

attendance.time = function(req,res){
  res.send('idk')
}

attendance.newstudent = function(req,res){
  res.render('newstudent')
}

attendance.donewstudent = function(req,res){
  res.send('newstudent')
}


module.exports = attendance;