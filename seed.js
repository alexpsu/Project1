// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require("./models");

var sampleUser = [{ userName: 'Alex', gender: 'male', age: 22 }];

var sampleColds =[
{
	name: 'Cold1',
	dateStart: '12-01-2015',
	dateEnd: '12-06-2015',
},
{
	name: 'Cold2',
	dateStart: '12-12-2015',
	dateEnd: '12-18-2015',
}
];

var sampleLogs =[
{
	currentDate: '2015-12-12',
	feelScale: 1,
	symptoms:[ 'cough', 'soar-throat', 'fever' ],
	vitamins: 1,
	exercise: 'ran',
	details: 'Morning, feel like shit.'
},
{
	currentDate: '2015-12-18',
	feelScale: 3,
	symptoms:[ 'tired', 'runny-nose' ],
	vitamins: 3,
	exercise: 'spin class',
	details: 'Evening, feel better.'
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