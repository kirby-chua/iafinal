var mongoose = require("mongoose");
var Student = require("../models/Student");
var Pending = require("../models/Pending");
var Approved = require("../models/Approved");
var attendance = {};

attendance.view = function (req,res){
	console.log(req.body.number);
	Student.find({number: req.body.number}, function(err, user){
		if(err) throw err;
		var found;		
		if(user==undefined||user.length==0) found = false;
		else found = true;
		
		if(found){
			Approved.find({number:req.body.number},function(err,attendance){
				if(err) throw err;
				console.log(attendance);
				res.render('view',{time: user[0].time, attendance: attendance});
			});
		}
		else {
			res.send('Student not found');
		}
	});
	
}

attendance.time = function(req,res){
	var date = req.body.date;
	var d1 = new Date(date + " "+ req.body.timeout);
	var d2 = new Date(date + " "+ req.body.timein)
	var diff=(d1.getTime()-d2.getTime())/60000;
	var newtime = new Pending({name: req.body.name, number: req.body.number, date:req.body.date,timein:req.body.timein,timeout: req.body.timeout ,time: diff});
	newtime.save(function(err,user){
		if(err) throw err;
	});
	
	res.redirect('/');
}

attendance.add = function(req,res){
  res.render('newstudent',{user : req.user});
}

attendance.doAdd = function(req,res){
	var newstudent = new Student({name: req.body.name, number: req.body.number, time:0});
	Student.find({number: req.body.number}, function(err, user){
		console.log(user);
		if(err) throw err;
		if(user.length==0){
			newstudent.save(function(err){
				if(err) throw err;
			});
			res.redirect('/');
		}
		else{
			res.send('Student already exists');
		}
		
	});	
}

attendance.list = function(req,res){
	Student.find({}, function(err, users){
		if(err) throw err;
		res.render('list',{user : req.user, student: users})
		
	});
	
}

attendance.approve = function(req,res){
	Pending.find({}, function(err, users){
		console.log(users);
		if(err) throw err;
		res.render('approve',{user : req.user, student: users})
		
	});
	
}


attendance.doApprove = function (req,res){
	
	Pending.find({number: req.body.number}, function(err, user){	
		if(err) throw err;
		var newtime = new Approved({name: user[0].name, number: user[0].number, date: user[0].date,timein:user[0].timein,timeout: user[0].timeout ,time: user[0].time});
		newtime.save(function(err,user){
			if(err) throw err;
		});
		Student.findOneAndUpdate({number:req.body.number}, {$inc : {time: user[0].time}},function(err,user){
			if(err) throw err;
		});
		user[0].remove(function(err){
			if(err) throw err;
		});
	});
	res.redirect('/approve');
}

attendance.disapprove = function (req,res){
	console.log(req.body.number);
	Pending.findOneAndRemove({number:req.body.number}, function(err){
		if(err) throw err;
	});
	res.redirect('/approve');
}
module.exports = attendance;