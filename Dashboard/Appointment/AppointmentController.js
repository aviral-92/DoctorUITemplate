scotchApp.controller('doctorAppointment', function($scope, $http) {

});

scotchApp.controller('patientHistory', function($scope, $http, $window) {
	
     $scope.btnClick = function() {
        $window.location.href = '#/patientAppointment';
        console.log($scope.dirty.value);
         
    }
    
});
scotchApp.controller('patientAppointmentSearch', function($scope,$rootScope, $http, $q, filterFilter, $location) {

    $scope.searchResult = false;
    $scope.spinner = false;
    var foodArray = [];
    $http.get("https://doctors.cfapps.io/api/doctor/get/all/expertisation").success(function(expertise) {
        foodArray = expertise;
    });

    var vm = this;
    // The following are used in md-autocomplete
    vm.selectedItem = null;
    vm.searchText = null;
    vm.selectedFoods = [];
    vm.transformChip = transformChip;

    vm.querySearchDeferred = querySearchDeferred;

    function transformChip(chip) {
        // If it is an object, it's already a known chip
        if (angular.isObject(chip)) {
            return chip;
        }
    }

    function querySearchDeferred(query) {
        var deferred = $q.defer();

        setTimeout(function() {
            if (query) {
                deferred.resolve(filterFilter(foodArray, query));
            } else {
                deferred.reject([{
                    country: 'None'
                }]);
            }
        }, 200);
        return deferred.promise;
    }
    
     $scope.btnClick = function(item) {
         
         var obj = {"expertized" : item[0]}
         var expertise = JSON.stringify(obj);
         console.log(expertise);
         
         var response = $http.post('https://doctors.cfapps.io/api/doctor/get/all', expertise);
         $scope.spinner = true;
         response.success(function(doctorsList){
                $scope.spinner = false;
                console.log(doctorsList);
                $scope.doctors = doctorsList;
        });
        response.error(function(data, status, headers, config) { 
            alert('Failure');
            $scope.spinner = false;
        });
         
         $scope.searchResult = true;

    }
     
     $scope.viewDoctor = function(doctor){
         
         console.log(doctor);
         $rootScope.doctorObj = doctor;
         $location.path('/patientAppointment');
     }
      
});
 
scotchApp.controller('patientAppointmentBook', function($scope, $http, $rootScope) {
	
    var getDoctor = $rootScope.doctorObj;
    console.log(getDoctor);
    if(getDoctor != undefined){
        getDoctor.appointment = new Date();    
    }
    $scope.doctor = getDoctor;
    
    $scope.bookAppointment = function(doctor){
        
        var appointment = [
            
        ]
        
        /*var response = $http.post('https://doctors.cfapps.io/api/appointment/appointment/make', );
        response.success(function(data){
            
        });
        response.error(function(data, status, headers, config) { 
            
        });*/
    }
});