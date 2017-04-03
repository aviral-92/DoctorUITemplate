scotchApp.controller('doctorAppointment', function ($scope, $http, $location, $rootScope, $location, popUpCalled) {

    var doctorAppointment = $rootScope.getDoctorAppointment;
    console.log('Appointment Data');
    console.log(doctorAppointment);
    $scope.doctorAppointments = doctorAppointment;

    $scope.viewPatient = function (doctorAppointment) {
        console.log(doctorAppointment);
        $rootScope.patientObj = doctorAppointment;
        //cancel appointment ned to check it
        $scope.cancelAppointment = function (PatientDetails) {
            var responseUpdate = $http.delete('https://doctors.cfapps.io/api/appointment/appointment/cancel/' + getPatient[0].dId);
            responseUpdate.success(function (data) {
                console.log('responseUpdate');
                console.log('success');
            });
            responseUpdate.error(function (data, status, headers, config) {
                /* console.log('failure');*/
                popUpCalled.popup('Service Down for Maintainance', 'We will be back in a while');
            });
        }
        //cancel appointment ned to check it
        $location.path('/doctorCancelAppointment');
    }
});

scotchApp.controller('doctorCancelAppointment', function ($scope, $http, $rootScope) {
    var getPatient = $rootScope.patientObj;
    console.log(getPatient);

    $scope.cancelAppointment = function (PatientDetails) {
        var responseUpdate = $http.delete('https://doctors.cfapps.io/api/appointment/appointment/cancel/' + getPatient[0].dId);
        responseUpdate.success(function (data) {
            console.log('responseUpdate');
            console.log('success');
        });
        responseUpdate.error(function (data, status, headers, config) {
            console.log('failure');
        });
    }
});


scotchApp.controller('patientHistory', function ($scope, $http, $window) {

    $scope.btnClick = function () {
        $window.location.href = '#/patientAppointment';
        console.log($scope.dirty.value);
    }

});
scotchApp.controller('patientAppointmentSearch', function ($scope, $rootScope, $http, $q, filterFilter, $location) {

    $scope.searchResult = false;
    $scope.spinner = false;
    var foodArray = [];
    $http.get("https://doctors.cfapps.io/api/doctor/get/all/expertisation").success(function (expertise) {
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

        setTimeout(function () {
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
    $scope.btnClick = function (item) {

        var obj = {
            "expertized": item[0]
        }
        var expertise = JSON.stringify(obj);
        console.log(expertise);
        var response = $http.post('https://doctors.cfapps.io/api/doctor/get/all', expertise);
        $scope.spinner = true;
        response.success(function (doctorsList) {
            $scope.spinner = false;
            console.log(doctorsList);
            $scope.doctors = doctorsList;
        });
        response.error(function (data, status, headers, config) {
            /* alert('Failure');*/
            $scope.spinner = false;
        });
        $scope.searchResult = true;
    }
    $scope.viewDoctor = function (doctor) {

        console.log(doctor);
        $rootScope.doctorObj = doctor;
        $location.path('/patientAppointment');
    }

});

scotchApp.controller('patientAppointmentBook', function ($scope, $http, $rootScope, $cookieStore, ajaxGetResponse, popUpCalled) {

    var getDoctor = $rootScope.doctorObj;
    console.log(getDoctor);
    if (getDoctor != undefined) {
        //        $scope.booking = {};
    }
    $scope.doctor = getDoctor;
    $scope.bookAppointment = function (doctor, booking) {

        var appointmentObj = {
            "appointmentDesc": booking.description,
            "createdDate": booking.appointmentDate,
            "dId": getDoctor.did,
            "pId": $cookieStore.get('patientLoginData').pId
        }
        var notificationObj = {
            "dId": getDoctor.did,
            "notiyfMessage": "New appointment booked, schedule on " + booking.appointmentDate
        }
        
        var appointment = JSON.stringify(appointmentObj);
        var sendNotification = JSON.stringify(notificationObj);
        console.log(appointment);
        var response = ajaxGetResponse.appointmentBookByPatient(appointment);
        response.success(function (data) {

            notifyDoctor(sendNotification);
            popUpCalled.popup('Appointment Booked', 'Your Appointment has been booked');
        });
        response.error(function (data, status, headers, config) {
            console.log('Booking appointment failed');
            //TODO to be remove once response comes in JSON
            notifyDoctor(sendNotification);
        });
    }

    function notifyDoctor(sendNotification) {

        var responseNotify = ajaxGetResponse.sendNotoficationToDoctor(sendNotification);
        responseNotify.success(function (data) {
            console.log('notofication Send');
        });
        responseNotify.error(function (data, status, headers, config) {
            console.log('sending notofication failed');
        });
    }
});
