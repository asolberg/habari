
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var mongo = require('mongodb');
var databaseUrl = "localhost/mydb";
var db = require('monk')('localhost/mydb');
var users = db.get('users');
var OAuth = require('OAuth');

users.insert({ name: 'Tobi', bigdata: {} });

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/users', function(req, res){
  users.find(req.query).on('success', function(doc) {
    res.send(doc);
  });
});

app.get('/strava', function(req, res){
  var id = 919;
  var secret = '2cdd3ee9ab90544f879882c30303ef08b63ec774';
  var OAuth2 = OAuth.OAuth2;    

  // function(clientId, clientSecret, baseSite, authorizePath, accessTokenPath, customHeaders)
  var oauth2 = new OAuth2(id,
    secret, 
    'https://www.strava.com/',
    'oauth/authorize',
    'oauth/token',
    null);
  oauth2.getOAuthAccessToken(
    '',
    {'grant_type':'client_credentials'},
    function (e, access_token, refresh_token, results){
    console.log('bearer: ',access_token);
    done();
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

app.get('/callback', function(req,res){
  console.log("callback was hit with");
  console.log(req.params);
  console.log(req.query);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
