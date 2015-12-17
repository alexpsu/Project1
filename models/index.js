var mongoose = require("mongoose");
mongoose.connect( process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL || 
                  "mongodb://localhost/feelBetter" )		

module.exports.User = require("./user.js");
module.exports.Cold = require("./cold.js");
module.exports.Log = require("./log.js");