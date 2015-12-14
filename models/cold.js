var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Log = require('./log');

var ColdSchema = new Schema({
	name: String,
	dateStart: Date,
	dateEnd: Date,
	logs: [Log.schema]
})

var Cold = mongoose.model('Cold', ColdSchema);

module.exports = Cold;
module.exports.Log = require("./log.js");