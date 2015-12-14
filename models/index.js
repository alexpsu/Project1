var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/users");

module.exports.User = require("./user.js");
module.exports.Cold = require("./cold.js");
module.exports.Log = require("./log.js");