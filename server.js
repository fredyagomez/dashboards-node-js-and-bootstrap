//////////////////
//  Dashboards
//  Back end code to setup login page, verify user, connect to data sources and send data to front end files
//
//  Change Control
//  v 1.0 - Fredy A Gomez - Created Initial Version
//
//////////////////

var express = require('express');
var passport = require('passport');
var fs = require('fs');
var Strategy = require('passport-local').Strategy;
var db = require('./db');

// Configure the local strategy for use by Passport.
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  

passport.use(new Strategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
}));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session. 
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});
passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

// Create a new Express application.
var app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

//Path to front end files
app.use(express.static('views'));


// Define routes.
app.get('/', function(req, res) {
	var username = req.param("username");
	var client_name = req.param("client_name");
	var data1 = ['Client 1','Client 2','Client 3'];
	var datatable = [ '11/01/2014 00:00:00',  '12/01/2014 00:00:00',  '01/01/2015 00:00:00',  '02/01/2015 00:00:00',  '03/01/2015 00:00:00',  '04/01/2015 00:00:00',  '05/01/2015 00:00:00',  '06/01/2015 00:00:00',  '07/01/2015 00:00:00',  '08/01/2015 00:00:00',
  '09/01/2015 00:00:00',  '10/01/2015 00:00:00',  '11/01/2015 00:00:00',  '12/01/2015 00:00:00',  '01/01/2016 00:00:00',  '02/01/2016 00:00:00',  '03/01/2016 00:00:00',  '04/01/2016 00:00:00',  '05/01/2016 00:00:00',  '06/01/2016 00:00:00',  '07/01/2016 00:00:00',  '08/01/2016 00:00:00',
  '09/01/2016 00:00:00',  '10/01/2016 00:00:00' ];
    var datatable1 = [ 27107373.479999993,  21684805.08999999,  22702994.470000006,  27913261.609999992,  24534267.579999994,  24082899.559999987,  32809225.650000002,  28875577.15,  28764384.72,  31099943.28,  32063979.7,  36542446.60999999,  33869210.67,  33208150.67,
  32791946.67,  37069852.67,  37055480.67,  39076166.67,  37076925.67,  37066540.67,  39012086.67,  37050480.67,  37887541.67,  38682046.67 ];
	
	//Below is optional. Use to connect to a data source using ODBC to pull data
	/*
	require("odbc").open("DSN=DSNName", function (err, db) {
	    var sqltable = "Query SQL";
        if (err) {
            console.error('There was an error', err);
            return;
        }
        if (!err) {
			
			sqlfinal = db.query(sqltable, function (err, data) {
                if (err)
				var datatable = [];
				for (var i = 0; i < data.length; i++) {
				  datatable[i] = (data[i].ROW);
				};
				var datatable1 = [];
				for (var i = 0; i < data.length; i++) {
				  datatable1[i] = (data[i].ROW1);
				};	
				res.render('Dashboard', { user: req.user, client_name: client_name, data1: data1, datatable: datatable, datatable1: datatable1});
            });
				db.close(function () {
                console.log('db connection closed');
            });
        }
    });
	*/
	
    res.render('Dashboard', { user: req.user, client_name: client_name, data1: data1, datatable: datatable, datatable1: datatable1});
  });

app.get('/login',
  function(req, res){
    res.render('login');
  });

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });

app.get('/chart', function(req, res) {
	var username = req.param("username");
	var client_name = req.param("client_name");
	var datachart = ([[1414800000, 8.62933e+006],[1417392000, 5.96142e+006],[1420070400, 6.25875e+006],[1422748800, 8.82736e+006],[1425168000, 7.07061e+006],[1427846400, 6.81468e+006],[1430438400, 1.16072e+007],[1433116800, 9.4325e+006],[1435708800, 7.75144e+006],
	[1438387200, 9.70552e+006],[1441065600, 1.06744e+007],[1443657600, 1.31255e+007],[1446336000, 6.29896e+006],[1448928000, 5.67706e+006],[1451606400, 6.18028e+006],[1454284800, 7.62057e+006],[1456790400, 7.61322e+006],[1459468800, 9.58878e+006],[1462060800, 7.61078e+006],
	[1464739200, 7.60534e+006],[1467331200, 9.58333e+006],[1470009600, 7.60776e+006],[1472688000, 8.28678e+006],[1475280000, 9.13725e+006]]);	
    res.render('Chart.ejs', { user: req.user, client_name: client_name, datachart: datachart});
  });
  
  
app.listen(1720);
console.log('Express started press Ctrl-C to terminate. Listening to 1720');