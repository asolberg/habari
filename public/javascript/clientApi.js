/**
 * Created by Arian on 2/21/14.
 */

/**
 * Created by Arian on 2/21/14.
 */

API_ENDPOINT = 'http://localhost:8080/getApiData'

function ClientApiWrapper(client_id){
    this.client_id = client.id;
}

ClientApiWrapper.prototype.getApiData = function (service, callback){

    payload = {
        'service':service
    }

    $.ajax({
        url: API_ENDPOINT,
        method: 'get',
        data: payload
    }).done(function (response) {
            callback(response)
        }).fail(function () {
            alert('get api data failed: ' + service);
        });
}

var clientApiWrapper = new ClientApiWrapper('129');

var strava_data = clientApiWrapper.getApiData('strava');

function updateData(resp){
    alert('updating data');
}
