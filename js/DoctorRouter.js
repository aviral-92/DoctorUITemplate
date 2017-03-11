var scotchApp = angular.module('myApp', ['ngCookies', 'ngRoute',
    'ui.bootstrap', 'UserValidation',
    'angularUtils.directives.dirPagination', 'ngSanitize',
    'MassAutoComplete', 'ngMaterial', 'vcRecaptcha'
]);

scotchApp.config(function($routeProvider) {
    $routeProvider

    // route for the home page
        .when('/', {
        templateUrl: '/html/Index_Slider.html',
        controller: 'indexSlider'
    })

    // route for the home page
    .when('/home', {
        templateUrl: '/html/Index_Slider.html',
        controller: 'indexSlider'
    })

    // route for Search
    .when('/search', {
        templateUrl: '/html/DoctorSearch.html',
        controller: 'doctorSearch'
    })

    // route for DoctorLogin
    .when('/loginPage', {
        templateUrl: '/html/LoginPage.html',
        controller: 'loginPage as loginDoc'
    })

    // route for PatientLogin
    .when('/patientLogin', {
        templateUrl: '/html/PatientLogin.html',
        controller: 'patientLogin as patientToLogin'
    })

    // route for the login page --------------Not in Use
    .when('/login', {
            templateUrl: '/html/Login.html',
            controller: 'login'
        })
        // route for the login Success page
        .when('/drLoginSuccess', {
            templateUrl: '/html/Dashboard/AfterLogin.html',
            controller: 'drLoginSuccess'
        })

    // route for the SignUp page
    .when('/signUp', {
        templateUrl: '/html/DoctorSignUp.html',
        controller: 'signUp'
    })

    // route for the About page
    .when('/about', {
        templateUrl: '/html/about.html',
        controller: 'about'
    })

    // route for the Contact page
    .when('/contact', {
        templateUrl: '/html/contact.html',
        controller: 'contact'
    })

    // route for the Dashboard page
    .when('/dashboard', {
        templateUrl: '/html/Dashboard/WelcomeDashboard.html',
        controller: 'dashboard'
    })

    // route for dashboard retrieve password  --------------Not in Use
    .when('/retrievePassword', {
        templateUrl: '/html/Dashboard/RetrievePassword.html',
        controller: 'retrievePassword'
    })

    // route for
    .when('/doctorRegistration', {
        templateUrl: '/html/DoctorRegistration.html',
        controller: 'doctorRegistration as DocRegisteration'
    })

    //
    .when('/patientRegistration', {
        templateUrl: '/html/PatientRegistration.html',
        controller: 'patientRegistration as patientRegister'
    })

    .when('/searchFunctionality', {
        templateUrl: '/html/SearchFunctionality/DoctorSearch.html',
        controller: 'functionalitySearch'
    })


    /* After Doctor Login Routing*/

    //Doctor dashboard home page rounting...
    .when('/doctorDashboard', {
        templateUrl: '/html/Dashboard/DocDashboardView.html',
        controller: 'doctorDashboard'
    })

    //Doctor profile page rounting...
    .when('/doctorProfile', {
        templateUrl: '/html/Dashboard/AfterLogin.html',
        controller: 'doctorProfile' //to be change to doctorProfile
    })

    // route for dashboard update profile
    .when('/updateDoctorProfile', {
        templateUrl: '/html/Dashboard/updateProfile.html',
        controller: 'updateDoctorProfile'
    })

    // route for the logout page
    .when('/logout', {
        templateUrl: '/html/LoginPage.html',
        controller: 'logout'
    });

});