var scotchApp = angular.module('myApp', ['ngCookies', 'ngRoute',
    'ui.bootstrap', 'UserValidation',
    'angularUtils.directives.dirPagination', 'ngSanitize',
    'MassAutoComplete', 'ngMaterial', 'vcRecaptcha'
]);


scotchApp.config(function($routeProvider) {
    $routeProvider
    
    // route for DoctorLogin
    .when('/loginPage', {
        templateUrl: 'Login/LoginPage.html',
        controller: 'loginPage as loginDoc'
    })

    // route for doctor Registeration
    .when('/doctorRegistration', {
        templateUrl: 'Login/DoctorRegistration.html',
        controller: 'doctorRegistration as DocRegisteration'
    })
    
   // route for PatientLogin
    .when('/patientLogin', {
        templateUrl: 'Login/PatientLogin.html',
        controller: 'patientLogin as patientToLogin'
    })
    
    // Patient Registeration
     .when('/patientRegistration', {
        templateUrl: 'Login/PatientRegistration.html',
        controller: 'patientRegistrations as patientRegister'
    })
    
    // route for the logout page
    .when('/logout', {
        templateUrl: 'Login/LoginPage.html',
        controller: 'logout'
    });
    
})