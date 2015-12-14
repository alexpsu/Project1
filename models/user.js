var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Sick = require('./sick');

var UserSchema = new Schema({
	userName: String,
	Sex: String,
	Age: Number,
	sicks: [Sick.schema]
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
module.exports.Sick = require("./sick.js");