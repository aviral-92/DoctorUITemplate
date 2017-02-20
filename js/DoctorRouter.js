var scotchApp = angular.module('myApp', [ 'ngCookies', 'ngRoute', 'ui.bootstrap',
		'UserValidation', 'angularUtils.directives.dirPagination', 'ngSanitize', 'MassAutoComplete' ]);

scotchApp.config(function($routeProvider) {
	$routeProvider
	
	// route for the home page
	.when('/', {
		templateUrl : '/html/Index_Slider.html',
		controller : 'indexSlider'
	})
	
	// route for the home page
	.when('/home', {
		templateUrl : '/html/Index_Slider.html',
		controller : 'indexSlider'
	})
	
	// route for Search
	.when('/search', {
		templateUrl : '/html/DoctorSearch.html',
		controller : 'doctorSearch'
	})
	
	// route for LoginPage
	.when('/loginPage', {
		templateUrl : '/html/LoginPage.html',
		controller : 'loginPage'
	})

	// route for the login page
	.when('/login', {
		templateUrl : '/html/Login.html',
		controller : 'login'
	})
	// route for the login Success page
	.when('/drLoginSuccess', {
		templateUrl : '/html/Dashboard/AfterLogin.html',
		controller : 'drLoginSuccess'
	})

	// route for the SignUp page
	.when('/signUp', {
		templateUrl : '/html/DoctorSignUp.html',
		controller : 'signUp'
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

	// route for dashboard retrieve password
	.when('/retrievePassword', {
		templateUrl : '/html/Dashboard/RetrievePassword.html',
		controller : 'retrievePassword'
	})
	
	.when('/searchFunctionality', {
		templateUrl : '/html/SearchFunctionality/DoctorSearch.html',
		controller : 'functionalitySearch'
	});

});
