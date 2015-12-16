var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LogSchema = new Schema({
	currentDate: String,
	feelScale: Number,
	symptoms:[String],
	vitamins: Number,
	exercise: String,
	details: String,
});

var Log = mongoose.model('Log', LogSchema);

module.exports = Log;