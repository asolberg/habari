
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var request = require('request');
var ejs = require('ejs');


var mongo = require('mongodb');
var databaseUrl = "localhost/mydb";
var db = require('monk')('localhost/mydb');
var users = db.get('users');
var OAuth = require('OAuth');
var ObjectId=require('mongodb').ObjectID

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res){
  var user_id = ObjectId("53083629d90708370e000001");
  users.findById(user_id, function(err, doc){
    //html = new ejs({url: '/template.ejs'}).render(data)
    console.log(JSON.stringify(doc));
    if (doc.hasOwnProperty(strava_activities)){
      var strava_activities = doc.strava_activities;
    } else {
      var strava_activities = null;
    }
    res.render('overview', {strava_data: JSON.stringify(doc.strava_activities)});
    //res.send(doc.strava_activities);

  });
});

app.get('/signup', function(req, res){

    res.render('signup');
    //res.send(doc.strava_activities);

});

app.get('/login', function(req, res){

  res.render('login');
  //res.send(doc.strava_activities);

});

app.get('/users', function(req, res){
  users.find(req.query).on('success', function(doc) {
    res.send(doc);
  });
});

app.get('/stravaPoll', function(req, res){
  var user_id = ObjectId("53083629d90708370e000001");
  users.findById(user_id, function(err, doc){
    //html = new ejs({url: '/template.ejs'}).render(data)
    var strava_access_token = doc.strava_access_token;
    var request = require('request');

    var options = {
      url: 'https://www.strava.com/api/v3/activities',
      headers: {
        'Authorization': 'Bearer ' + doc.strava_access_token,
      },
      method: 'get'
    };

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var computed_strava_data = Strava.computeSummary(body);
        users.findAndModify({'_id':user_id}, {$set:{'strava_activities':computed_strava_data}});
        res.json(computed_strava_data);
      } else {
        res.send([]);
      }
    }

    request(options, callback);

  });

});

app.get('/fitbit', function(req, res){
  // function(requestUrl, accessUrl, consumerKey, consumerSecret, version, authorize_callback, signatureMethod, nonceSize, customHeaders)
  var key = '3e6ede05450d4718be60c2829b2d9f6d';
  var secret = '7e16e2c6b67c4bac90731cc721ff45b4';
  var oauth = new OAuth.OAuth(
    'https://api.fitbit.com/oauth/request_token',
    'https://api.fitbit.com/oauth/access_token',
    key,
    secret,
    '1.0A',
    'http://www.habari.com/callback',
    'HMAC-SHA1'
  );
  console.log('send it off');

  // getOAuthAccessToken= function(oauth_token, oauth_token_secret, oauth_verifier,  callback)

  // function(url, oauth_token, oauth_token_secret, callback) {
});

app.get('/stravaCallback', function(req,res){
  //var user_id = req.session.user_id;
  //var oauth_code = req.code;
  //var user_id = req.session.user_id
  // fixme get user id from session?
  var user_id = ObjectId("53083629d90708370e000001");
  var strava_client_id = '919';
  var strava_client_secret = '2cdd3ee9ab90544f879882c30303ef08b63ec774';
  var strava_secret_code = req.query.code;

  users.findAndModify({'_id':user_id}, {$set:{'code':strava_secret_code}});

  // function(clientId, clientSecret, baseSite, authorizePath, accessTokenPath, customHeaders)
  var OAuth2 = OAuth.OAuth2;
  var oauth2 = new OAuth2(strava_client_id, strava_client_secret, 'https://www.strava.com/',
        'oauth/authorize',
        'oauth/token',
    null);

  oauth2.getOAuthAccessToken(strava_secret_code, {'grant_type':'client_credentials'},
    function (e, access_token, refresh_token, results){
      console.log('bearer: ',access_token);
      users.findAndModify({'_id':user_id}, {$set:{'strava_access_token':access_token, 'strava_refresh_token':refresh_token}});

      var request = require('request');

      var options = {
        url: 'https://www.strava.com/api/v3/activities',
        headers: {
            'Authorization': 'Bearer ' + access_token,
        },
        method: 'get'
      };

      function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
          users.findAndModify({'_id':user_id}, {$set:{'strava_activities':Strava.computeSummary(body)}});
          res.writeHead(302, {
            'Location': '/?add_strava_success=1'
          });
          res.end();
        } else {
          res.send([]);
        }
      }

      request(options, callback);

    })


});


/** helper function **/
var Strava = {
    /**
     *
     * jsonRespStr - the Strava activities response string
     *
     * Returns {
     *  "total_calories": {total_calories},
     *  "total_distances": {total_distances},
     *  "max_speed": {max_speed},
     *  "max_distance": {max_distance},
     *  "calories_graph_data": [ cal1, cal2, .. ],
     *  "distances_graph_data": [dist1, dist2, ...],
     *  
     * }
     *
     */
    computeSummary: function(jsonRespStr) {
        var activities = JSON.parse(jsonRespStr);
        var total_distances = 0;
        var total_calories = 0;
        var max_speed = 0;
        var max_distance = 0;
        var calories = [];
        var distances = [];

        for (var i = 0; i < activities.length; i++) {
            var activity = activities[i];
            total_distances += activity.distance;
            total_calories += activity.calories;
            max_speed = Math.max(max_speed, activity.max_speed);
            max_distance = Math.max(max_distance, activity.distance);

            calories.push({
                x: new Date(activity.start_date),
                y: activity.calories,
                distance: activity.distance,
            });

            distances.push({
                x: new Date(activity.start_date),
                y: activity.distance,
                calories: activity.calories,
            });
        }

        return {
            "total_calories": total_calories,
            "total_distances": total_distances,
            "max_speed": max_speed,
            "max_distance": max_distance,
            "calories_graph_data": calories,
            "distances_graph_data": distances,
       };
    },
};



http.createServer(app).listen(app.get('port'), '0.0.0.0', function(){
  console.log('Express server listening on port ' + app.get('port'));
});
