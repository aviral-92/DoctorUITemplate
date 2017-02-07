var scotchApp = angular.module('myApp', [ 'ngCookies', 'ngRoute',
		'UserValidation' ]);

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

	// route for the logout page
	.when('/logout', {
		templateUrl : '/html/Login.html',
		controller : 'logout'
	})

	// route for the login Success page
	.when('/drLoginSuccess', {
		templateUrl : '/html/Dashboard/AfterLogin.html',
		controller : 'drLoginSuccess'
	})

	// route for the patient login page
	.when('/patientlogin', {
		templateUrl : '/html/PatientService/PatientLogin.html',
		controller : 'patientlogin'
	})

	// route for the patient login Success page
	.when('/patientLoginSuccess', {
		templateUrl : '/html/PatientService/patientLoginSuccess.html',
		controller : 'patientLoginSuccess'
	})
	// route for the SignUp page
	.when('/signUp', {
		templateUrl : '/html/DoctorSignUp.html',
		controller : 'signUp'
	})

	// route for the patient signup page
	.when('/patientsignup', {
		templateUrl : '/html/PatientService/PatientSignUp.html',
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
	})

	// route for the Dashboard page
	.when('/dashboard', {
		templateUrl : '/html/Dashboard/WelcomeDashboard.html',
		controller : 'dashboard'
	})

	// route for dashboard update profile
	.when('/updateProfile', {
		templateUrl : '/html/Dashboard/updateProfile.html',
		controller : 'updateProfile'
	})

	// route for dashboard retrieve password
	.when('/retrievePassword', {
		templateUrl : '/html/Dashboard/RetrievePassword.html',
		controller : 'retrievePassword'
	})

	// route for dashboard home page
	.when('/afterLogin', {
		templateUrl : '/html/Dashboard/AfterLogin.html',
		controller : 'afterLogin'
	});
});
