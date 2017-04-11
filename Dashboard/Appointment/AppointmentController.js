scotchApp.controller('doctorAppointment', function ($scope, $cookieStore, $window, $location, popUpCalled, ajaxGetResponse) {

    refreshAppointmentDetails($cookieStore.get('doctorLoginData').did);

    $scope.viewPatient = function (doctorAppointment) {
        console.log(doctorAppointment);
        $window.localStorage.setItem('patientObj', angular.toJson(doctorAppointment));
        //cancel appointment ned to check it
        $location.path('/doctorCancelAppointment');
    }

    $scope.cancelAppointment = function (PatientDetails) {
        var responseUpdate = ajaxGetResponse.cancelAppointmentById(PatientDetails.appointmentId);
        responseUpdate.success(function (data) {
            console.log('success');
            refreshAppointmentDetails($cookieStore.get('doctorLoginData').did);
            popUpCalled.popup('Appointment Cancel', 'Successfully..!!!!');
        });
        responseUpdate.error(function (data, status, headers, config) {
            popUpCalled.popup('Service Down for Maintainance', 'We will be back in a while');
        });
    }

    function refreshAppointmentDetails(dId) {
        var getAppointmentResponse = ajaxGetResponse.getAppointmentByDoctorId(dId);
        //$scope.spinner = true;
        getAppointmentResponse.success(function (appointment) {
            //$scope.spinner = false;
            $window.localStorage.setItem('getDoctorAppointment', angular.toJson(appointment));
            console.log('success');
            console.log(appointment);
            $scope.doctorAppointments = appointment;
        });
        getAppointmentResponse.error(function (data, status, headers, config) {
            //$scope.spinner = false;
            console.error('Error');
        });
    }
});

scotchApp.controller('doctorCancelAppointment', function ($scope, $http, $rootScope, $window, ajaxGetResponse, popUpCalled, $route) {

    var getPatient = JSON.parse($window.localStorage.getItem('patientObj'));
    console.log(getPatient);
    $scope.doctor = getPatient;

    var age = new Date().getYear() - new Date($scope.doctor.patient.dob).getYear();
    $scope.doctor.patient.age = age;

    $scope.cancelAppointment = function (doctor) {
        var responseUpdate = ajaxGetResponse.cancelAppointmentById(doctor.appointmentId);
        responseUpdate.success(function (data) {
            console.log('success');
            popUpCalled.popup('Appointment Cancel', 'Successfully..!!!!');
            $window.location.href = "#/doctorAppointment";
        });
        responseUpdate.error(function (data, status, headers, config) {
            console.log('failure');
        });
    }
});


scotchApp.controller('viewPatientAppointment', function ($scope, $http, $window, ajaxGetResponse, $filter) {

    var viewAppointment = JSON.parse($window.localStorage.getItem('getPatientAppointment'));
    console.log(viewAppointment);
    var today = $filter('date')(new Date(), 'yyyy-MM-dd');
    //    $scope.todaysDate = today;
    for (var i = 0; i < viewAppointment.length; i++) {
        if (today > viewAppointment[i].appointmentDate) {
            viewAppointment[i].disable = true;
        } else {
            viewAppointment[i].disable = false;
        }
    }
    $scope.doctors = viewAppointment;

    $scope.cancelAppointment = function (doctor) {
        var responseUpdate = ajaxGetResponse.cancelAppointmentById(doctor.appointmentId);
        responseUpdate.success(function (data) {
            //            console.log('responseUpdate');
            console.log('success');
            popUpCalled.popup('Appointment Cancel', 'Successfully..!!!!');
        });
        responseUpdate.error(function (data, status, headers, config) {
            console.log('failure');
        });
    }

    //For Map
    $scope.getCurrentDoctor = function (doctor) {

        $window.localStorage.setItem('currentDoctor', angular.toJson(doctor));
        $window.location.href = '#/map';
    }

});
scotchApp.controller('patientAppointmentSearch', function ($scope, $rootScope, $http, $q, filterFilter, $location, $window) {

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
        $window.localStorage.setItem('doctorObj', angular.toJson(doctor));
        //$rootScope.doctorObj = doctor;
        $location.path('/patientAppointment');
    }

});

scotchApp.controller('patientAppointmentBook', function ($scope, $http, $rootScope, $cookieStore, $window, ajaxGetResponse, popUpCalled) {

    var getDoctor = JSON.parse($window.localStorage.getItem('doctorObj'));
    //var getDoctor = $rootScope.doctorObj;
    console.log(getDoctor);
    if (getDoctor != undefined) {
        //        $scope.booking = {};
    }
    $scope.doctor = getDoctor;
    $scope.bookAppointment = function (doctor, booking) {

        var appointmentObj = {
            "appointmentDesc": booking.description,
            "appointmentDate": booking.appointmentDate,
            "dId": getDoctor.did,
            "pId": $cookieStore.get('patientLoginData').pId
        }
        var notificationObj = {
            "dId": getDoctor.did,
            "notiyfMessage": "New appointment booked, schedule on " + booking.appointmentDate
        }
        var calendarObj = {
            "pId": $cookieStore.get('patientLoginData').pId,
            "calendarTitle": booking.description,
            "startDate": booking.appointmentDate,
            "endDate": booking.appointmentDate
        }

        var appointment = JSON.stringify(appointmentObj);
        var sendNotification = JSON.stringify(notificationObj);
        var calendarEvent = JSON.stringify(calendarObj);

        console.log(appointment);
        var response = ajaxGetResponse.appointmentBookByPatient(appointment);
        response.success(function (data) {

            notifyDoctor(sendNotification);
            addCalendarEvents(calendarEvent);
            popUpCalled.popup('Appointment Booked', 'Your Appointment has been booked');
             $window.location.href = "#/viewPatientAppointment";
        });
        response.error(function (data, status, headers, config) {
            console.log('Booking appointment failed');
            //TODO to be remove once response comes in JSON
            notifyDoctor(sendNotification);
            addCalendarEvents(calendarEvent);
        });
    }

    //function for adding events in Calendar.
    function addCalendarEvents(calendarEvent) {

        var responseCalendarEvent = ajaxGetResponse.addCalendarEventByPatientId(calendarEvent);
        responseCalendarEvent.success(function (data) {
            console.log('Calendar Event Set');
        });
        responseCalendarEvent.error(function (data, status, headers, config) {
            console.log('Unable to set event');
        });
    }

    // function for sending notification
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

scotchApp.controller('patientAppointmentHistory', function ($scope, $rootScope, $cookieStore, $window, ajaxGetResponse, popUpCalled) {

});
