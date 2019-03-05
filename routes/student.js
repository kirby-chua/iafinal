var express = require('express');
var router = express.Router();
var attendance = require("../controllers/attendance.js");

router.get('/', attendance.student);

router.get('/newstudent', attendance.newstudent);

router.get('/newstudent', attendance.donewstudent);

router.get('/time', attendance.time);


module.exports = router;
