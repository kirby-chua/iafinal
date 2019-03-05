var express = require('express');
var router = express.Router();
var attendance = require("../controllers/attendance.js");

router.post('/', attendance.student);

router.get('/add', attendance.add);

router.get('/view', attendance.view);

router.post('/add', attendance.doAdd);

router.post('/time', attendance.time);


module.exports = router;
