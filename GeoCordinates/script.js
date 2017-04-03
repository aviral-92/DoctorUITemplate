// Code goes here

angular.module('myApp',['geolocation'])
  .controller('mainCtrl', function ($scope,geolocation) {
    $scope.coords = geolocation.getLocation().then(function(data){
      return {lat:data.coords.latitude, long:data.coords.longitude};
    });
});