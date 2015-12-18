var express = require('express'),
    app = express();
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');

var db = require("./models");

app.get('/', function homepage (req, res) {
	db.User.find(function(err, users){
	res.render('index' , {users});
	});
});

app.get('/users/:id', function homepage (req, res) {
  	db.User.findOne({_id: req.params.id}, function(err, userdata) {
		res.render('users/show', {user: userdata});
	});
});

app.get('/users/:userId/colds/:id', function homepage (req, res) {
  db.User.findOne({_id: req.params.userId}, function(err, userdata) {
  	var coldId = req.params.id;
  	var name = userdata.userName;
  	var id = userdata._id;
  	var foundCold = userdata.colds.id(coldId);
  	res.render('colds/show', {userName: name, uId: id, cold: foundCold});
  });
});

/*
 * JSON API Endpoints
 */

 app.get('/api', function api_index (req, res){
 	res.json({
 		message: "Welcome to Feel Better",
 		documentation_url: "httpse://github.com/alexpsu/project1",
 		base_url: "localhost:3000"
 	});
 });

//User APIs
app.get('/api/users', function index(req, res){
 	db.User.find(function(err, allUsers){
 		if(err){console.log(err)};
 		res.json({users: allUsers});
 	});
});

app.get('/api/users/:id', function index(req, res){
	db.User.findOne({_id: req.params.id}, function(err, user) {
		res.json(user);
		var foundCold = user.colds.id(coldId);
	});
});

app.post('/api/users', function create(req, res){
 	var newUser = req.body;
 	db.User.create(newUser, function(err, user){
 		if(err){console.log(err)};
 		res.json({user});
 	});
});

//Cold APIs
app.get('/api/users/:userId/colds', function index(req, res){
  console.log('requested user id=', req.params.userid);
  db.User.findOne({_id: req.params.userid}, function(err, user) {
    res.json(user.colds);
  });
});

app.post('/api/users/:userId/colds', function create(req, res){
  console.log('body', req.body);
  db.User.findOne({_id: req.params.userId}, function(err, user) {
    if (err) { console.log('error', err); }
    var cold = new db.Cold(req.body);
    user.colds.push(cold);

    user.save(function(err, savedUser) {
      if (err) { console.log('error', err); }
      console.log('user with new cold saved:', savedUser);
      res.json(user.colds);
    });
  });
});

app.get('/api/users/:userId/colds/:id', function index(req, res){
	console.log('requested user id=', req.params.userid);
	var coldId = req.params.id;
	db.User.findOne({_id: req.params.userid}, function(err, user) {
		var foundCold = user.colds.id(coldId);
		res.json(foundCold);
    });
});

app.put('/api/users/:userId/colds/:id', function index(req, res){
	var userId = req.params.userId;
	var coldId = req.params.id;
	db.User.findOne({_id: userId}, function(err, user) {
	  	var foundCold = user.colds.id(coldId);
  		foundCold.name = req.body.name;
  		foundCold.dateStart = req.body.dateStart;
  		foundCold.dateEnd = req.body.dateEnd;

    	user.save(function(err, saved) {
    		if(err) { console.log('error', err); }
    		res.json(saved);
    	});  	
    });
});

app.delete('/api/users/:userId/colds/:id', function(req, res) {
	var userId = req.params.userId;
	var coldId = req.params.id;
	db.User.findOne({_id: userId}, function(err, user) {
    	if (err) {console.log(error, err);}
    	// find song embedded in album
    	var foundCold = user.colds.id(coldId);
    	// delete
    	foundCold.remove();
    	// save changes
    	user.save(function(err, saved) {
    		if(err) { console.log('error', err); }
    		res.json(saved);
    	});
    })
});

//log apis

// app.get('/api/users/:userId/colds/:coldId/logs', function index(req, res){
// 	console.log('requested user id=', req.params.userid);
// 	var coldId = req.params.coldId;
// 	db.User.findOne({_id: req.params.userid}, function(err, user) {
// 		var foundCold = user.colds.id(coldId);
// 		var logs = foundCold.logs;
// 		res.json(logs);
//     });
// });

app.post('/api/users/:userId/colds/:coldId/logs', function create(req, res){
  var coldId = req.params.coldId;
  req.body.symptoms = req.body.symptoms.split(",");
  var newLog = new db.Log(req.body);
  db.User.findOne({_id: req.params.userId}, function(err, user) {
    if (err) { console.log('error', err); }
    var foundCold = user.colds.id(coldId);
    var log = new db.Log(newLog);
    foundCold.logs.push(log);

    user.save(function(err, savedLog) {
      if (err) { console.log('error', err); }
      console.log('\nuser with new log saved:', savedLog);
      res.json(foundCold.logs);
    });
  });
});

// app.get('/api/users/:userId/colds/:coldId/logs/:id', function index(req, res){
// 	var userId = req.params.userId;
// 	var coldId = req.params.coldId;
// 	var logId = req.params.id;
// 	db.User.findOne({_id: userId}, function(err, user) {
// 		var foundCold = user.colds.id(coldId);
// 		var foundLog = foundCold.logs.id(logId);
// 		res.json(foundLog);
//     });
// });

app.put('/api/users/:userId/colds/:coldId/logs/:id', function index(req, res){
	var userId = req.params.userId;
	var coldId = req.params.coldId;
	var logId = req.params.id;
	db.User.findOne({_id: userId}, function(err, user) {
	  	var foundCold = user.colds.id(coldId);
	  	var foundLog = foundCold.logs.id(logId);
  		foundLog.currentDate = req.body.currentDate;
  		foundLog.feelScale = req.body.feelScale;
  		foundLog.symptoms = req.body.symptoms;
  		foundLog.vitamins = req.body.vitamins;
  		foundLog.exercise = req.body.exercise;
  		foundLog.details = req.body.details;

    	user.save(function(err, saved) {
    		if(err) { console.log('error', err); }
    		res.json(saved);
    	});  	
    });
});

app.delete('/api/users/:userId/colds/:coldId/logs/:id', function(req, res) {
	var userId = req.params.userId;
	var coldId = req.params.coldId;
	var logId = req.params.id;
	db.User.findOne({_id: userId}, function(err, user) {
    	if (err) {console.log(error, err);}
    	// find cold embedded in user
    	var foundCold = user.colds.id(coldId);
    	// find log embedded in cold
    	var foundLog = foundCold.logs.id(logId)
    	// delete
    	foundLog.remove();
    	// save changes
    	user.save(function(err, saved) {
    		if(err) { console.log('error', err); }
    		res.json(saved);
    	});
    })
});



/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});