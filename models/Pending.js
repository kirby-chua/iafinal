var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TimeSchema = new Schema({
	number: Number, 
	date: String, 
	name: String,
	timein: String,
	timeout: String,
	time:  Number
});


module.exports = mongoose.model('Pending', TimeSchema);