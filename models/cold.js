var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Log = require('./log');

var ColdSchema = new Schema({
	name: String,
	dateStart: String,
	dateEnd: String,
	logs: [Log.schema]
});

var Cold = mongoose.model('Cold', ColdSchema);

module.exports = Cold;
module.exports.Log = require("./log.js");