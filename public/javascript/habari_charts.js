

var FitBit = {
    /**
     * jsonRespStr - response of the Get-Activities API
     */
    createDistanceChartData: function(dateObj, jsonRespStr) {
        var obj = JSON.parse(jsonRespStr);
        obj = obj.activities;
        var result = [];
        for (var i = 0; i < obj.length; i++) {
            result.push({
                x: dateObj,
                y: obj[i].distance,
                calories: obj[i].calories,
            });
        }
        return result;
    },
    createCaloriesChartData: function(dateObj, jsonRespStr) {
        var obj = JSON.parse(jsonRespStr);
        obj = obj.activities;
        var result = [];
        for (var i = 0; i < obj.length; i++) {
            result.push({
                x: dateObj,
                y: obj[i].calories,
                distance: obj[i].distance,
            });
        }
        return result;
    },
};


var NikePlus = {
    /**
     * jsonRespStr - response of list activities /me/sport/activities
     */
    createDistanceChartData: function(jsonRespStr) {
        var obj = JSON.parse(jsonRespStr);
        obj = obj.data;
        var result = [];
        for (var i = 0; i < obj.length; i++) {
            result.push({
                x: new Date(obj[i].startTime),
                y: obj[i].distance,
                calories: obj[i].calories,
            });
        }
        return result;
    },
    /**
     * jsonRespStr - response of list activities /me/sport/activities
     */
    createCaloriesChartData: function(jsonRespStr) {
        var obj = JSON.parse(jsonRespStr);
        obj = obj.data;
        var result = [];
        for (var i = 0; i < obj.length; i++) {
            result.push({
                x: new Date(obj[i].startTime),
                y: obj[i].calories,
                distance: obj[i].distance,
            });
        }
        return result;
    },
};




$(function () {
    $('#distance_container').highcharts({
        chart: {
        },
        title: {
            text: 'Distance'
        },
        xAxis: {
            type: 'datetime',
                dateTimeLabelFormats: {
                    day: '%b %e',
                    week: '%b %e',
                }
        },
        yAxis: {
            title: {
                text: 'Distance (miles)',
            }
        },
        credits: { enabled: false, },
        legend: {
            enabled: true,
        },
        tooltip: {
            formatter: function() {
                var s;
                s = Highcharts.dateFormat('%m/%d/%Y', this.x) + '<br />';
                s += 'Distance: ' + this.y + ' miles' + '<br />';
                s += 'Calories: ' + this.point.calories + '<br />';
                return s;
            }
        },
        labels: { },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black, 0 0 3px black'
                    }
                }
            }
        },
        series: [
        {
            type: 'column',
            name: 'Nike+',
            data: [
                { 
                    x: Date.UTC(2014, 2, 1),
                    y: 1.4,
                    calories: 148,
                },
                {
                    x: Date.UTC(2014, 2, 2),
                    y: 2.7,
                    calories: 286,
                },
                {
                    x: Date.UTC(2014, 2, 3),
                    y: 0,
                    calories: 0,
                },
                {
                    x: Date.UTC(2014, 2, 4),
                    y: 0.7,
                    calories: 74,
                },
                {
                    x: Date.UTC(2014, 2, 5),
                    y: 1.5,
                    calories: 159,
                }
            ]
        },
        {
            type: 'column',
            name: 'MapMyFitness',
            data: [
                { 
                    x: Date.UTC(2014, 2, 1),
                    y: 1.3,
                    calories: 137,
                },
                {
                    x: Date.UTC(2014, 2, 2),
                    y: 0,
                    calories: 0,
                },
                {
                    x: Date.UTC(2014, 2, 3),
                    y: 2.7,
                    calories: 286,
                },
                {
                    x: Date.UTC(2014, 2, 4),
                    y: 2.0,
                    calories: 212,
                },
                {
                    x: Date.UTC(2014, 2, 5),
                    y: 1.2,
                    calories: 127,
                }
            ]
        },

        ]
    });


    $('#calorie_container').highcharts({
        chart: {
        },
        title: {
            text: 'Calories'
        },
        xAxis: {
            type: 'datetime',
                dateTimeLabelFormats: {
                    day: '%b %e',
                    week: '%b %e',
                }
        },
        yAxis: {
            title: {
                text: 'Calories',
            }
        },
        legend: {
            enabled: true,
        },
        credits: { enabled: false, },
        tooltip: {
            formatter: function() {
                var s;
                s = Highcharts.dateFormat('%m/%d/%Y', this.x) + '<br />';
                s += 'Distance: ' + this.point.distance + ' miles' + '<br />';
                s += 'Calories: ' + this.y + '<br />';
                return s;
            }
        },
        labels: { },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black, 0 0 3px black'
                    }
                }
            }
        },
        series: [
        {
            type: 'column',
            name: 'Nike+',
            data: [
                { 
                    x: Date.UTC(2014, 2, 1),
                    distance: 1.4,
                    y: 148,
                },
                {
                    x: Date.UTC(2014, 2, 2),
                    distance: 2.7,
                    y: 286,
                },
                {
                    x: Date.UTC(2014, 2, 3),
                    distance: 0,
                    y: 0,
                },
                {
                    x: Date.UTC(2014, 2, 4),
                    distance: 0.7,
                    y: 74,
                },
                {
                    x: Date.UTC(2014, 2, 5),
                    distance: 1.5,
                    y: 159,
                }
            ]
        },
        {
            type: 'column',
            name: 'MapMyFitness',
            data: [
                { 
                    x: Date.UTC(2014, 2, 1),
                    distance: 1.3,
                    y: 137,
                },
                {
                    x: Date.UTC(2014, 2, 2),
                    y: 0,
                    distance: 0,
                },
                {
                    x: Date.UTC(2014, 2, 3),
                    distance: 2.7,
                    y: 286,
                },
                {
                    x: Date.UTC(2014, 2, 4),
                    distance: 2.0,
                    y: 212,
                },
                {
                    x: Date.UTC(2014, 2, 5),
                    distance: 1.2,
                    y: 127,
                }
            ]
        },

        ]
    });


    var parser = document.createElement('a');
    parser.href = window.location.href;
    var query_string = parser.search;
    var params = {};
    if (query_string != '') {
        var parts = query_string.substr(1).split("&");
        for (var i = 0; i < parts.length; i++) {
            var key_val = parts[i].split("=");
            params[key_val[0]] = key_val[1];
        }
    }

    if (params.hasOwnProperty("add_strava_success") && params['add_strava_success'] == 1) {
        // update the dashboard
      setTimeout(function(){
        $('.initialhide').show();
        var iAniSpeed = 2000;
        var sBgColor = 'white';
        $('.initialhide').animate( { backgroundColor: sBgColor }, iAniSpeed);
        //your code to be executed after 1 seconds
      },1000)

      setTimeout(function(){
        $('.initialhide2').show();
        var iAniSpeed = 2000;
       var sBgColor = 'white';
        $('.initialhide2').animate( { backgroundColor: sBgColor }, iAniSpeed);
        //your code to be executed after 1 seconds
      },10000)

        $("#s_total_calories").fadeOut(500, function() {
            var a = parseFloat($("#s_total_calories").text());
            $("#s_total_calories").text((a + 619).toString()).fadeIn(500);
        });
        $("#s_total_distance").fadeOut(500, function() {
            var a = parseFloat($("#s_total_distance").text());
            $("#s_total_distance").text((a + 23.7).toString()).fadeIn(500);
        });
	/*
		WE SHOULD NOT BE UPDATING STEPS WHEN ADDING BIKE DATA
		$("#s_total_steps").fadeOut(500, function() {
		    $("#s_total_steps").text('5521').fadeIn(500);
		});
	*/

        // add new data series to chart
        var calories_chart = $('#calorie_container').highcharts();
        calories_chart.addSeries({
            type: 'column',
            name: 'Strava',
            data: [
                { 
                    x: Date.UTC(2014, 2, 1),
                    distance: 8,
                    y: 360,
                },
                {
                    x: Date.UTC(2014, 2, 2),
                    distance: 1.48,
                    y: 66,
                },
                {
                    x: Date.UTC(2014, 2, 3),
                    distance: 3,
                    y: 135,
                },
                {
                    x: Date.UTC(2014, 2, 4),
                    distance: 7.3,
                    y: 328,
                },
                {
                    x: Date.UTC(2014, 2, 5),
                    distance: 3.9,
                    y: 176,
                }
            ]
        });


        var distance_chart = $('#distance_container').highcharts();
        distance_chart.addSeries({
            type: 'column',
            name: 'Strava',
            data: [
                { 
                    x: Date.UTC(2014, 2, 1),
                    y: 8,
                    calories: 360,
                },
                {
                    x: Date.UTC(2014, 2, 2),
                    y: 1.48,
                    calories: 66,
                },
                {
                    x: Date.UTC(2014, 2, 3),
                    y: 3,
                    calories: 135,
                },
                {
                    x: Date.UTC(2014, 2, 4),
                    y: 7.3,
                    calories: 328,
                },
                {
                    x: Date.UTC(2014, 2, 5),
                    y: 3.9,
                    calories: 176,
                }
            ]
        });

      $('#stravaElement').show();
    }




});

