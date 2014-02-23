/**
 * Created by Arian on 2/21/14.
 */

/**
 * Created by Arian on 2/21/14.
 */

//API_ENDPOINT = 'http://localhost:8080/stravaPoll'
//
//function ClientApiWrapper(client_id){
//}
//
//ClientApiWrapper.prototype.getStravaApiData = function (callback){
//
//
//
//    $.ajax({
//        url: API_ENDPOINT,
//        method: 'get'
//    }).done(function (response) {
//            callback(response)
//        }).fail(function () {
//            alert('get api data failed: ' + service);
//        });
//}
//
//var clientApiWrapper = new ClientApiWrapper();
//
////var strava_data = clientApiWrapper.getStravaApiData();
//
//ClientApiWrapper.prototype.startStravaPolling = function (){
//  var that = this;
//  setInterval(function(){that.getStravaApiData(updateData)},1000);
//}
//
//function updateData(resp){
//  activityData.strava_data = resp;
//  // update charts
//}
//
//if (activityData.strava_data){
//  clientApiWrapper.startStravaPolling();
//  $('.initialhide').fadeIn();
//} else {
//  alert('no global variable');
//}

$(document).ready(function() {
  $('div.main li').click(function(){

    $('div.main li.active').removeClass('active');
    $(this).addClass('active');
    //this.addClass('active');

  })

  $('div.main li#stravaElement').click(function(){

    loadStravaData();
    $('div.steps').hide();
    setTimeout(function(){
      $('#s_total_calories').html('1065');
    },500);
    setTimeout(function(){
      $('#s_total_distance').html('23.68');
    },500);

  })

  $('div.main li.overview').click(function(){

    loadMainData();
    $('div.steps').show();
    setTimeout(function(){
      $('#s_total_calories').html('2079');
    },500);
    setTimeout(function(){
      $('#s_total_distance').html('37.5');
    },500);
    setTimeout(function(){
      $('#s_total_steps').html('29680');
    },500);

  })

  })