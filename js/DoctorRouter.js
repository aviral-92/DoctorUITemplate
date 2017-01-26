var scotchApp = angular.module('myApp', [ 'ngRoute' , 'UserValidation']);

scotchApp.config(function($routeProvider) {
	$routeProvider

	.when('/', {
		templateUrl : '/Users/Aviral/Desktop/Template/html/Container.html',
		controller : 'middleContent'
	})
	
	// route for the home page
	.when('/login', {
		templateUrl : '/Users/Aviral/Desktop/Template/html/Login.html',
		controller : 'login'
	})

	// route for the about page
	.when('/signUp', {
		templateUrl : '/html/Template/DoctorSignUp.html',
		controller : 'signUp'
	})

	// route for the contact page
	.when('/deletePatient', {
		templateUrl : '/html/testDoctor/deletePatient.html',
		controller : 'deleteDoctorController'
	})

	
	.when('/updatePatient', {
		templateUrl : '/html/testDoctor/updatePatient.html',
		controller : 'updateDoctorController'
	});
});

