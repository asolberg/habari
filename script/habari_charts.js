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
                console.log(this);
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

