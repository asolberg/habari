<?php
// required types

$access_token = $_GET['access_token'];
$function = $_GET['method']; // { AGGREGATE, ACTIVITES, UPDATE}

// optional feilds 
$offset = $_GET['offset'];
$count = $_GET['count'];
$startDate = $_GET['startDate'];
$endDate = $_GET['endDate'];

switch ($function) {
	case "AGGREGATE":
		return_aggregateData();
		break;
	case "ACTIVITES":
		return_activityData();
		break;
	case "UPDATE":
		// adds a log to the NIKE+ records table and 
		break;
}

function return_aggregateData() {
	echo json_encode( 
		array (	'experienceTypes' => array("RUNNING"), 
				'summaries' => array(
					array(	"experienceType" => "RUNNING",
							"records" => array(
								array("recordType" => "LIFETIMEDURATION", "recordValue" => "0:08:11.126"),
								array("recordType" => "LIFETIMEGPSRUNS", "recordValue" => "2"),
								array("recordType" => "LONGESTRUNDISTANCE", "recordValue" => "4.74"),
								array("recordType" => "LIFETIMEDISTANCE", "recordValue" => "19.11")							
								)
						)
					)
				)
			);	
}

function return_activityData() {
	echo json_encode( 
		array 	(	'data' => array(
						array(	"activityId" => "1",
								"calories" => 675,
								"distance" => 4.32,
								"steps" => 1475,
     							"duration" => "0:01:00.0000",
								"startTime" => "2013-02-09T08:00:00Z",
								"activityType" => "ALL_DAY",								
								"deviceType" => "FUELBAND"
						),
						array(	"activityId" => "2",
								"calories" => 482,
								"distance" => 2.20,
								"steps" => 725,
     							"duration" => "0:01:00.0000",
								"startTime" => "2013-02-10T08:00:00Z",
								"activityType" => "ALL_DAY",								
								"deviceType" => "FUELBAND"
						),
						array(	"activityId" => "3",
								"calories" => 593,
								"distance" => 2.53,
								"steps" => 1092,
     							"duration" => "0:01:00.0000",
								"startTime" => "2013-02-11T08:00:00Z",
								"activityType" => "ALL_DAY",								
								"deviceType" => "FUELBAND"
						),
						array(	"activityId" => "4",
								"calories" => 389,
								"distance" => 1.46,
								"steps" => 562,
     							"duration" => "0:01:00.0000",
								"startTime" => "2013-02-12T08:00:00Z",
								"activityType" => "ALL_DAY",								
								"deviceType" => "FUELBAND"
						),
						array(	"activityId" => "5",
								"calories" => 429,
								"distance" => 1.74,
								"steps" => 601,
     							"duration" => "0:01:00.0000",
								"startTime" => "2013-02-13T08:00:00Z",
								"activityType" => "ALL_DAY",								
								"deviceType" => "FUELBAND"
						),
						array(	"activityId" => "6",
								"calories" => 543,
								"distance" => 2.12,
								"steps" => 821,
     							"duration" => "0:01:00.0000",
								"startTime" => "2013-02-14T08:00:00Z",
								"activityType" => "ALL_DAY",								
								"deviceType" => "FUELBAND"
						),
						array(	"activityId" => "7",
								"calories" => 832,
								"distance" => 4.74,
								"steps" => 1223,
     							"duration" => "0:01:00.0000",
								"startTime" => "2013-02-15T08:00:00Z",
								"activityType" => "ALL_DAY",								
								"deviceType" => "FUELBAND"
						)
					)
				)
			);
			 

}


?>