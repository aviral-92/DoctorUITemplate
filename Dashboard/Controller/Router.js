var scotchApp = angular.module('myApp', ['ngMaterial', 'ngMessages', 'ngRoute', 'ngCookies', 'mwl.calendar', 'ngAnimate', 'ui.bootstrap', 'colorpicker.module', 'angularUtils.directives.dirPagination', 'google-maps']);

scotchApp.config(function ($routeProvider) {
    $routeProvider
        //Doctor Dashboard
        // route for the home page
        .when('/home', {
            templateUrl: 'Dashboard/pages/home.html',
            controller: 'home',
            activetab: 'docDashboard'
        })

        // route for the home page
        .when('/profile', {
            templateUrl: 'Dashboard/pages/profile.html',
            controller: 'profile',
            activetab: 'docProfile'
        })

        /*// route for Calender page
        .when('/calender', {
            templateUrl: 'Dashboard/pages/CalendarRoute.html',
            controller: 'calender'
        })*/

        // route for the Angular Calender page
        .when('/docCal', {
            templateUrl: 'Dashboard/calender/DoctorCalender.html',
            controller: 'KitchenSinkCtrl as vm',
            activetab: 'docCalendar'
        })

        // route for the Angular Calender page
        .when('/patientCal', {
            templateUrl: 'Dashboard/calender/PatientCalender.html',
            controller: 'KitchenSinkCtrl as vm',
            activetab: 'patientCalendar'
        })

        // Doctor Dashboard
        // route for the home page
        .when('/patientHome', {
            templateUrl: 'Dashboard/pages/PatientHome.html',
            controller: 'patientHome',
            activetab: 'patientDashboard'
        })

        // route for Logout page
        .when('/signout', {
            templateUrl: '/Login/LoginPage.html',
            controller: 'signout'
        })

        // route for the home page
        .when('/patientProfile', {
            templateUrl: 'Dashboard/pages/PatientProfile.html',
            controller: 'patientProfile',
            activetab: 'patientProfile'
        })

        // route for Doctor Appointment
        .when('/doctorAppointment', {
            templateUrl: 'Dashboard/Appointment/DoctorAppointment.html',
            controller: 'doctorAppointment',
            activetab: 'docAppointment'
        })

        // route for doctor view patient and cancel Appointment also
        .when('/doctorCancelAppointment', {
            templateUrl: 'Dashboard/Appointment/DoctorCancelAppointment.html',
            controller: 'doctorCancelAppointment'
        })

        // route for Patient Appointment
        .when('/patientAppointment', {
            templateUrl: 'Dashboard/Appointment/PatientBookAppointment.html',
            controller: 'patientAppointmentBook',
            activetab: 'patientAppointment'
        })

        // route for Patient new appointment page
        .when('/searchAppointment', {
            templateUrl: 'Dashboard/Appointment/PatientSearchAppointment.html',
            controller: 'patientAppointmentSearch as vm'
        })

        // route for Patient History page
        .when('/patientAppointmentHistory', {
            templateUrl: 'Dashboard/Appointment/PatientAppointmentHistory.html',
            controller: 'patientAppointmentHistory'
        })
        // route for Patient History page
        .when('/viewPatientAppointment', {
            templateUrl: 'Dashboard/Appointment/ViewPatientAppointment.html',
            controller: 'viewPatientAppointment'
        })

        .when('/map', {
            templateUrl: 'Dashboard/Map/Map.html',
            controller: 'doctorGeoLocation'
        })

        .otherwise({
            templateUrl: '/ErrorPage.html',
            controller: 'Error404Controller'
        });

});
