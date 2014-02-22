

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


var Strava = {
    /**
     * Returns {
     *  "total_calories": {total_calories},
     *  "total_distances": {total_distances},
     *  "max_speed": {max_speed},
     *  "max_distance": {max_distance},
     *  "calories_graph_data": [ cal1, cal2, .. ],
     *  "distances_graph_data": [dist1, dist2, ...],
     *
     *  heart_rate?
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

    /**
     * construct a data series from response of /api/v3/athlete/activities
     *
     * jsonRespStr - response string of the activities list /api/v3/athlete/activities
     * activityType - optional.  ie. ride, run, swim, etc.
     */
    createDistanceChartData: function(jsonRespStr, activityType) {
        var obj = JSON.parse(jsonRespStr);
        var result = [];
        for (var i = 0; i < obj.length; i++) {
            // filter by activity type
            if (typeof activityType == 'undefined' 
                || (typeof activityType == 'string' 
                && activityType.toUpperCase() == obj[i].type.toUpperCase())) {
                result.push({
                    x: new Date(obj[i].start_date),
                    y: obj[i].distance,
                    calories: obj[i].calories,
                });
            }
        }
        return result;
    },

    /**
     * jsonRespStr - response string of the activities list /api/v3/athlete/activities
     */
    createCaloriesChartData: function(jsonRespStr, activityType) {
        var obj = JSON.parse(jsonRespStr);
        var result = [];
        for (var i = 0; i < obj.length; i++) {
            // filter by activity type
            if (typeof activityType == 'undefined' 
                || (typeof activityType == 'string' 
                && activityType.toUpperCase() == obj[i].type.toUpperCase())) {
                result.push({
                    x: new Date(obj[i].start_date),
                    y: obj[i].calories,
                    distance: obj[i].distance,
                });
            }
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
        legend: {
            enabled: false,
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
        series: [{
            type: 'column',
            name: 'Jane',
            data: [
                { 
                    x: Date.UTC(2014, 2, 1),
                    y: 8,
                    calories: 122,
                },
                {
                    x: Date.UTC(2014, 2, 3),
                    y: 10,
                    calories: 140,
                },
                {
                    x: Date.UTC(2014, 2, 7),
                    y: 11,
                    calories: 166,
                },
                {
                    x: Date.UTC(2014, 2, 15),
                    y: 9,
                    calories: 134,
                },
                {
                    x: Date.UTC(2014, 2, 19),
                    y: 15,
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
            enabled: false,
        },
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
        series: [{
            type: 'column',
            name: 'Jane',
            data: [
                { 
                    x: Date.UTC(2014, 2, 1),
                    distance: 8,
                    y: 122,
                },
                {
                    x: Date.UTC(2014, 2, 3),
                    distance: 10,
                    y: 140,
                },
                {
                    x: Date.UTC(2014, 2, 7),
                    distance: 11,
                    y: 166,
                },
                {
                    x: Date.UTC(2014, 2, 15),
                    distance: 9,
                    y: 134,
                },
                {
                    x: Date.UTC(2014, 2, 19),
                    distance: 15,
                    y: 160,
                }
            ]
        },
        ]
    });
});

