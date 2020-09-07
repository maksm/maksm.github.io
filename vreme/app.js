var app = angular.module('plunker', ['bootstrap','ngGeolocation'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when("/tab/:tabId", {
        templateUrl: 'tabs.html'
      })
      .otherwise({
        redirectTo: "/tab/1"
      });
}]);


app.controller('MainCtrl', function($scope, $location, $geolocation, $http) {
  $scope.location = $location;
  $geolocation.getCurrentPosition().then(function(position) {
      $scope.lon = position.coords.longitude;
      $scope.lat = position.coords.latitude;
  });
  $scope.napoved = "Napoved se ni naložila.";
  $http.get("https://meteo.arso.gov.si/uploads/probase/www/fproduct/text/sl/fcast_si_text.html")
    .then(function(response) {
      $scope.napoved = response.data;
  });
});

app.controller("TabsCtrl", function($scope, $routeParams, $location, $geolocation) {

  $scope.date = new Date();
  
  $geolocation.getCurrentPosition().then(function(position) {
      $scope.lon = position.coords.longitude;
      $scope.lat = position.coords.latitude;
  });

  //Each time controller is recreated, check tab in url
  $scope.currentTab = +$routeParams.tabId; //+ to parse to int

  $scope.$watch('currentTab', function(id, oldId) {
    if (id !== oldId) {
      $location.path('/tab/'+id);
    }
  });
});
 
