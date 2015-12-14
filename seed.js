// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require("./models");

var sampleUser = { userName: 'Alex', gender: 'male', age: 22 };

var sampleColds =[
{
	name: 'Cold1',
	dateStart: ,
	dateEnd: ,
},
{
	name: 'Cold2',
	dateStart: ,
	dateEnd: ,
}
]:

var sampleLogs =[
{
	currentDate: Date,
	feelScale: 1,
	Symptons:[ 'cough', 'soar-throat', 'fever' ],
	vitamins: 1,
	exercise: 1
},
{
	currentDate: Date,
	feelScale: 3,
	Symptons:[ 'tired', 'runny-nose' ],
	vitamins: 3,
	exercise: 3
}
];

sampleColds.forEach(function(ele){
	ele.logs = sampleLogs;
});

sampleUser.forEach(function(ele){
	ele.colds = sampleColds;
});

db.User.remove({}, function(err, albums){

	db.User.create(sampleUser, function(err, users){
		if(err) { return console.log(err); }
		console.log("all users", users);
		console.log("create this many users", users.length);
		process.exit();
	});
});