var app = angular.module('myApp', ['ngGeolocation'])
.run(function($rootScope, $geolocation) {
    $rootScope.hribi = {}
    $geolocation.getCurrentPosition().then(function(position) {
        console.log("LOCATION")
        $rootScope.position = position;
    });
    if (navigator.geolocation) {
        console.log("Location available.");
		navigator.geolocation.getCurrentPosition(
            function showPosition(position) {
                console.log("Location set.");
                $rootScope.position = position;
        });
	} else {
        console.log("No location available.");
    }
})

app.controller('hribiCtrl', 
    function($scope, $rootScope, $http, $geolocation, csv2json) {
      $scope.hribi = {};
      $scope.position = $rootScope.position;
      $http.get("hribi.csv")
        .then(function(response) {
            $scope.hribi = csv2json.convert(response.data);
            $rootScope.hribi = $scope.hribi;
        });
    $geolocation.getCurrentPosition().then(function(position) {
        console.log("LOCATION2")
        $rootScope.position = position;
    });
    if (navigator.geolocation) {
        console.log("Location available.2");
		navigator.geolocation.getCurrentPosition(
            function showPosition(position) {
                console.log("Location set2.");
                $rootScope.position = position;
        });
	} else {
        console.log("No location available2.");
    }
 });

app.factory('csv2json', function() {
    return {
        convert: function(csv_data) {
            var record = csv_data.split(/\r\n|\n/);
            var headers = record[0].split(';');
            var json = {};
            for (var i = 1; i < record.length; i++) {
                var data = record[i].split(';');
                if (data.length == headers.length) {
                    var tarr = {};
                    for (var j = 0; j < headers.length; j++) {
                        tarr[headers[j]] = data[j];
                    }
                    json[parseInt(tarr['id'])] = tarr;
                }
            }
            return json;
        }
    };
});

function getDistanceCurrent(lat, lon){
    return getDistance(lat, lon, $rootScope.position.lat, $rootScope.position.lon);
}

function getDistance(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
