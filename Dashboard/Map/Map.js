scotchApp.controller('doctorGeoLocation', function ($scope, $rootScope, $cookieStore, $window, ajaxGetResponse, popUpCalled, $document) {

    var currentLatitude = $window.localStorage.getItem('currentLatitude');
    var currentLongitude = $window.localStorage.getItem('currentLongitude');
    var doctorLocation = JSON.parse($window.localStorage.getItem('currentDoctor'));

    // map object
    $scope.map = {
        control: {},
        center: {
            latitude: doctorLocation.doctor.latitude,
            longitude: doctorLocation.doctor.longitude
        },
        zoom: 14
    };

    // marker object
    $scope.marker = {
        center: {
            latitude: doctorLocation.doctor.latitude,
            longitude: doctorLocation.doctor.longitude
        }
    }

    // instantiate google map objects for directions
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var directionsService = new google.maps.DirectionsService();
    var geocoder = new google.maps.Geocoder();

    // directions object -- with defaults
    $scope.directions = {
        origin: currentLatitude + ',' + currentLongitude,
        destination: doctorLocation.doctor.latitude + ',' + doctorLocation.doctor.longitude,
        showList: false
    }

    // get directions using google maps api
    getDirection();

    //for directions on button click
    $scope.getDirections = function () {
        getDirection();
    }

    function getDirection() {
        // get directions using google maps api
        var request = {
            origin: $scope.directions.origin,
            destination: $scope.directions.destination,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        directionsService.route(request, function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                directionsDisplay.setMap($scope.map.control.getGMap());
                directionsDisplay.setPanel(document.getElementById('directionsList'));
                $scope.directions.showList = true;
            } else {
                alert('Google route unsuccesfull!');
            }
        });
    }
});
