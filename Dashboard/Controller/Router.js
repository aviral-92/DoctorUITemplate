var scotchApp = angular.module('myApp', ['ngMaterial','ngMessages', 'ngRoute', 'ngCookies']);

scotchApp.config(function($routeProvider) {
    $routeProvider
//Doctor Dashboard
    // route for the home page
        .when('/home', {
        templateUrl: 'Dashboard/pages/home.html',
        controller: 'home'
    })
    
     // route for the home page
        .when('/profile', {
        templateUrl: 'Dashboard/pages/profile.html',
        controller: 'profile'
    })
    
    // route for Calender page
        .when('/calender', {
        templateUrl: 'Dashboard/pages/CalendarRoute.html',
        controller: 'calender'
    })
    
   // Doctor Dashboard
    // route for the home page
        .when('/patientHome', {
        templateUrl: 'Dashboard/pages/PatientHome.html',
        controller: 'patientHome'
    })
    
    // route for Logout page
        .when('/signout', {
        templateUrl: '/html/LoginPage.html',
        controller: 'signout'
    })
    
     // route for the home page
        .when('/patientProfile', {
        templateUrl: 'Dashboard/pages/PatientProfile.html',
        controller: 'patientProfile'
    });

});