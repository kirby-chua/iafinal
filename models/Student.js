var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = new Schema({
	name: String,
	number: Number,
	time:  Number
});


module.exports = mongoose.model('Student', StudentSchema);