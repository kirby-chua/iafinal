var express = require('express');
var router = express.Router();
var attendance = require("../controllers/attendance.js");


router.get('/add', attendance.add);

router.get('/list', attendance.list);

router.post('/view', attendance.view);

router.post('/add', attendance.doAdd);

router.post('/time', attendance.time);

router.get('/approve', attendance.approve);

router.post('/approve', attendance.doApprove);

router.post('/disapprove', attendance.disapprove);

module.exports = router;
