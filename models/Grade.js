var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GradeSchema = new Schema({
	O: Number, 
	V: Number,
	G: Number, 
	S: Number,
	U: Number
});


module.exports = mongoose.model('Grade', GradeSchema);