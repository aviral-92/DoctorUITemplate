var scotchApp = angular.module('myApp', [ 'ngRoute' , 'UserValidation']);

scotchApp.config(function($routeProvider) {
	$routeProvider

	// route for the home page
	.when('/', {
		templateUrl : '/html/Container.html',
		controller : 'middleContent'
	})
	
	// route for the login page
	.when('/login', {
		templateUrl : '/html/Login.html',
		controller : 'login'
	})
	
	// route for the login Success page
	.when('/drLoginSuccess', {
		templateUrl : '/html/Dr_LoginSuccess.html',
		controller : 'drLoginSuccess'
	})
	
	// route for the patient login page
	.when('/patientlogin', {
		templateUrl : '/html/PatientLogin.html',
		controller : 'patientlogin'
	})

	// route for the SignUp page
	.when('/signUp', {
		templateUrl : '/html/DoctorSignUp.html',
		controller : 'signUp'
	})
	
	// route for the patient signup page
	.when('/patientsignup', {
		templateUrl : '/html/PatientSignUp.html',
		controller : 'patientsignup'
	})
	
	// route for the About page
	.when('/about', {
		templateUrl : '/html/about.html',
		controller : 'about'
	})

	// route for the Contact page	
	.when('/contact', {
		templateUrl : '/html/contact.html',
		controller : 'contact'
	});
});

