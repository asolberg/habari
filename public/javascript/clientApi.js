/**
 * Created by Arian on 2/21/14.
 */

/**
 * Created by Arian on 2/21/14.
 */

API_ENDPOINT = 'http://localhost:8080/stravaPoll'

function ClientApiWrapper(client_id){
}

ClientApiWrapper.prototype.getStravaApiData = function (callback){



    $.ajax({
        url: API_ENDPOINT,
        method: 'get'
    }).done(function (response) {
            callback(response)
        }).fail(function () {
            alert('get api data failed: ' + service);
        });
}

var clientApiWrapper = new ClientApiWrapper();

//var strava_data = clientApiWrapper.getStravaApiData();

ClientApiWrapper.prototype.startStravaPolling = function (){
  var that = this;
  setInterval(function(){that.getStravaApiData(updateData)},1000);
}

function updateData(resp){
  activityData.strava_data = resp;
}

if (activityData.strava_data){
  clientApiWrapper.startStravaPolling();
} else {
  alert('no global variable');
}