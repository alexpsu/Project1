var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LogSchema = new Schema({
	currentDate: Date,
	feelScale: Number,
	Symptons:[String],
	vitamins: Number,
	exercise: Number
});

var Log = mongoose.model('Log', LogSchema);

module.exports = Log;