var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SickSchema = new Schema({
	name: String,
	dateStart: Date,
	dateEnd: Date,
	logs: [Log.schema]
})

var Sick = mongoose.model('Sick', SickSchema);

module.exports = Sick;
module.exports.Log = require("./log.js");