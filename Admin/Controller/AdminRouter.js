var scotchApp = angular.module('myApp', [ 'ngRoute', 'ngCookies' ]);

scotchApp.config(function($routeProvider) {
	$routeProvider
	// Admin Dashboard
	// route for the home page
	.when('/adminHome', {
		templateUrl : 'Admin/pages/AdminHome.html',
		controller : 'adminHome'
	})
    // route for the index page
    .when('/adminIndexPage', {
		templateUrl : 'Admin/pages/AdminIndexPage.html',
		controller : 'adminIndexPage'
	})
	// route for the about us page
	 .when('/adminAboutUsPage', {
		templateUrl : 'Admin/pages/AdminAboutUsPage.html',
		controller : 'adminAboutUsPage'
	})
	// route for the contact us page
	 .when('/adminContactUsPage', {
		templateUrl : 'Admin/pages/AdminContactUs.html',
		controller : 'adminContactUsPage'
	})
	// route for the doctor page
	.when('/adminDoctorPage', {
		templateUrl : 'Admin/pages/AdminDoctorPage.html',
		controller : 'adminDoctorPage'
	})
	// route for the patient page
	.when('/adminPatientPage', {
		templateUrl : 'Admin/pages/AdminPatientPage.html',
		controller : 'adminPatientPage'
	});
});
