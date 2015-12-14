var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/users");

module.exports.User= require("./user.js");
module.exports.Sick = require("./sick.js");
module.exports.Log = require("./log.js");