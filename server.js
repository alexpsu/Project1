var express = require('express'),
    app = express();
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

var db = require("./models");

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
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
	console.log(req.params);
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

app.get('/api/users/:userId/colds/:coldId/logs', function index(req, res){
	console.log('requested user id=', req.params.userid);
	db.User.findOne({_id: req.params.userid}, function(err, user) {
		var foundCold = user.colds.id(coldId);
		var logs = foundCold.logs;
		res.json(logs);
    });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});