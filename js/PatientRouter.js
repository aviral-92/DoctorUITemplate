scotchApp.config(function($routeProvider) {
	$routeProvider

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
	
	// route for the patient signup page
	.when('/patientsignup', {
		templateUrl : '/html/PatientService/PatientSignUp.html',
		controller : 'patientsignup'
	})

	// route for the About page
	/*.when('/about', {
		templateUrl : '/html/about.html',
		controller : 'about'
	})

	// route for the Contact page
	.when('/contact', {
		templateUrl : '/html/contact.html',
		controller : 'contact'
	})*/

	// route for dashboard update profile
	.when('/patientupdateProfile', {
		templateUrl : '/html/PatientDashboard/PatientupdateProfile.html',
		controller : 'patientupdateProfile'
	})

	// route for dashboard retrieve password
	.when('/retrievePassword', {
		templateUrl : '/html/Dashboard/RetrievePassword.html',
		controller : 'retrievePassword'
	})

	// route for the Dashboard page
	.when('/patientdashboard', {
		templateUrl : '/html/PatientDashboard/WelcomePatientDashboard.html',
		controller : 'patientdashboard'
	})
	// route for patient dashboard home page
	.when('/patientafterLogin', {
		templateUrl : '/html/PatientDashboard/PatientAfterLogin.html',
		controller : 'patientafterLogin'
	})
	// route for the logout page
	.when('/patientlogout', {
		templateUrl : '/html/PatientService/PatientLogin.html',
		controller : 'patientlogout'
	});
});
