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


app.controller('MainCtrl', function($scope, $location, $geolocation) {
  $scope.location = $location;
  $geolocation.getCurrentPosition().then(function(position) {
      $scope.lon = position.coords.longitude;
      $scope.lat = position.coords.latitude;
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
 
