var mongoose = require("mongoose");
var Student = require("../models/Student");
var Pending = require("../models/Pending");
var Approved = require("../models/Approved");
var Grade = require("../models/Grade");
var attendance = {};

attendance.view = function (req,res){
	var grade; 
	Grade.find({},function(err,grades){
		if(err) throw err;
		Student.find({number: req.body.number}, function(err, user){
		if(err) throw err;
		var found;		
		if(user==undefined||user.length==0) found = false;
		else found = true;	
		if(found){
			Approved.find({number:req.body.number},function(err,attendance){
				if(err) throw err;
				//console.log(attendance);
				var grade;
				if(user[0].time>=grades[0].O){
					grade = 'O';
				}
				else if(user[0].time>=grades[0].V){
					grade = 'V';
				}
				else if(user[0].time>=grades[0].G){
					Grade='G';
				}
				else if(user[0].time>=grades[0].S){
					grade='S';
				}
				else{
					grade='U';
				}
				res.render('view',{time: user[0].time, attendance: attendance, score:grade, grade:grades[0] });
			});
		}
		else {
			res.send('Student not found');
		}
	});
		
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

attendance.remove = function (req,res){
	console.log(req.body.number);
	Student.findOneAndRemove({number:req.body.number}, function(err){
		if(err) throw err;
	});
	res.redirect('/list');
}

attendance.grade = function(req,res){
	Grade.find({}, function(err,grade){
		if(grade.length==0){
			new Grade({O:0,V:0,G:0,S:0,U:0}).save(function(err){
				if(err) throw err;
			});
		}
		if(err) throw err;
		res.render('grade',{user: req.user,grade:grade[0]});
	});
}

attendance.doGrade = function(req,res){
	console.log(req.body);
	var test = {[req.body.grade]: req.body.time};
	console.log(test);
	Grade.findOneAndUpdate({},{[req.body.grade]:req.body.time},function(err,user){
		if(err) throw err;
	});
	Grade.find({},function(err,grade){
		grade[0].update({[req.body.grade]:req.body.time});
	});
	res.redirect('/grade')
}

module.exports = attendance;