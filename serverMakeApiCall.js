/**
 * Created by Arian on 2/21/14.
 */

var https = require('https');

function ServerApiWrapper(account_number, service){
    this.account_number = account_number;
    this.service = service;
}

ServerApiWrapper.prototype.makeApiCall = function (endpoint, auth_key, method, payload, callback){

    this.performRequest(endpoint, method, payload, callback, 'true', auth_token);
    Bearer 83ebeabdec09f6670863766f792ead24d61fe3f9
    $.ajaxPrefilter(function(options, originalOptions, xhr) {
        xhr.setRequestHeader('X-OAuth-Token', this.auth_token);
    });

    $.ajax({
        url: endpoint,
        method: method,
        data: payload
    }).done(function (response) {
            callback(response)
        }).fail(function () {
            alert('json call failed: ' + endpoint + method + post);
        });
}

ServerApiWrapper.prototype.authenticate = function(oauth_endpoint, oauth_version, oauth_method){

    // fixme
    // Get Client ID
    // Get Client Secret
    // https://www.strava.com/oauth/token
    var = this;
    this.client_id = '919';
    this.client_secret = '2cdd3ee9ab90544f879882c30303ef08b63ec774';
    this.code = '23123123'

    var this_object = this;
    var payload = {
        'client_id': this.client_id,
        'client_secret': this.client_secret,
        'code': this.code,
        'origin':'http://www.localhost.com'
    }

    this.performRequest(oauth_endpoint, oauth_method, payload, success, false);
};

ServerApiWrapper.prototype.registerAuthData = function(resp){
    var resp_object = JSON.parse(resp);
    this_object =


}

ServerApiWrapper.prototype.performRequest(endpoint, method, data, success, auth_required, auth_token) {

    var headers = {};

    if (options.auth_required){
        headers['Authorization'] = 'Bearer ' + auth_token;
    }

    if (options.headers){
        headers = merge_options(headers, options.headers);
    }

    var dataString = JSON.stringify(data);

    if (method == 'GET') {
        endpoint += '?' + querystring.stringify(data);
        headers = {}
    } else {
        headers = {
            'Content-Type': 'application/json',
            'Content-Length': dataString.length
        };
    }

    var options = {
        host: host,
        path: endpoint,
        method: method,
        headers: headers
    };

    var req = https.request(options, function(res) {
        res.setEncoding('utf-8');

        var responseString = '';

        res.on('data', function(data) {
            responseString += data;
        });

        res.on('end', function() {
            console.log(responseString);
            var responseObject = JSON.parse(responseString);
            success(responseObject);
        });
    });

    req.write(dataString);
    req.end();
}

function merge_options(obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}

var strava = new ServerApiWrapper();

strava.authenticate('2', 'https://www.strava.com/oauth/token');

function testCallback(resp){
    alert(JSON.stringify(resp));
}
alert('testing system');
