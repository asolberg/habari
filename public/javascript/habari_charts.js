

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
                    y: 8,
                    calories: 122,
                },
                {
                    x: Date.UTC(2014, 2, 2),
                    y: 10,
                    calories: 140,
                },
                {
                    x: Date.UTC(2014, 2, 3),
                    y: 11,
                    calories: 166,
                },
                {
                    x: Date.UTC(2014, 2, 4),
                    y: 9,
                    calories: 134,
                },
                {
                    x: Date.UTC(2014, 2, 5),
                    y: 15,
                    calories: 160,
                }
            ]
        },
        {
            type: 'column',
            name: 'MapMyFitness',
            data: [
                { 
                    x: Date.UTC(2014, 2, 1),
                    y: 4,
                    calories: 122,
                },
                {
                    x: Date.UTC(2014, 2, 2),
                    y: 5.5,
                    calories: 140,
                },
                {
                    x: Date.UTC(2014, 2, 3),
                    y: 4.8,
                    calories: 166,
                },
                {
                    x: Date.UTC(2014, 2, 4),
                    y: 3.4,
                    calories: 134,
                },
                {
                    x: Date.UTC(2014, 2, 5),
                    y: 8,
                    calories: 160,
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
                    distance: 8,
                    y: 122,
                },
                {
                    x: Date.UTC(2014, 2, 2),
                    distance: 10,
                    y: 140,
                },
                {
                    x: Date.UTC(2014, 2, 3),
                    distance: 11,
                    y: 166,
                },
                {
                    x: Date.UTC(2014, 2, 4),
                    distance: 9,
                    y: 134,
                },
                {
                    x: Date.UTC(2014, 2, 5),
                    distance: 15,
                    y: 160,
                }
            ]
        },
        {
            type: 'column',
            name: 'MapMyFitness',
            data: [
                { 
                    x: Date.UTC(2014, 2, 1),
                    distance: 8,
                    y: 102,
                },
                {
                    x: Date.UTC(2014, 2, 2),
                    distance: 10,
                    y: 110,
                },
                {
                    x: Date.UTC(2014, 2, 3),
                    distance: 11,
                    y: 99,
                },
                {
                    x: Date.UTC(2014, 2, 4),
                    distance: 9,
                    y: 122,
                },
                {
                    x: Date.UTC(2014, 2, 5),
                    distance: 15,
                    y: 80,
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
            $("#s_total_calories").text('802').fadeIn(500);
        });
        $("#s_total_distance").fadeOut(500, function() {
            $("#s_total_distance").text('32.5').fadeIn(500);
        });
        $("#s_total_steps").fadeOut(500, function() {
            $("#s_total_steps").text('5521').fadeIn(500);
        });

        // add new data series to chart
        var calories_chart = $('#calorie_container').highcharts();
        calories_chart.addSeries({
            type: 'column',
            name: 'Strava',
            data: [
                { 
                    x: Date.UTC(2014, 2, 1),
                    distance: 8,
                    y: 144,
                },
                {
                    x: Date.UTC(2014, 2, 2),
                    distance: 10,
                    y: 151,
                },
                {
                    x: Date.UTC(2014, 2, 3),
                    distance: 11,
                    y: 187,
                },
                {
                    x: Date.UTC(2014, 2, 4),
                    distance: 9,
                    y: 148,
                },
                {
                    x: Date.UTC(2014, 2, 5),
                    distance: 15,
                    y: 177,
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
                    y: 13,
                    calories: 122,
                },
                {
                    x: Date.UTC(2014, 2, 2),
                    y: 13.4,
                    calories: 140,
                },
                {
                    x: Date.UTC(2014, 2, 3),
                    y: 12.3,
                    calories: 166,
                },
                {
                    x: Date.UTC(2014, 2, 4),
                    y: 11.1,
                    calories: 134,
                },
                {
                    x: Date.UTC(2014, 2, 5),
                    y: 16.4,
                    calories: 160,
                }
            ]
        });

      $('#stravaElement').show();
    }




});

