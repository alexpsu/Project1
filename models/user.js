var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Cold = require('./cold');

var UserSchema = new Schema({
	userName: String,
	Gender: String,
	Age: Number,
	colds: [Cold.schema]
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
module.exports.Cold = require("./cold.js");