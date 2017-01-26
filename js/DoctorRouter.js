var scotchApp = angular.module('myApp', [ 'ngRoute' , 'UserValidation']);

scotchApp.config(function($routeProvider) {
	$routeProvider

	.when('/', {
		templateUrl : '/html/Container.html',
		controller : 'middleContent'
	})
	
	// route for the home page
	.when('/login', {
		templateUrl : 'http://srydada.96.lt/html/Login.html',
		controller : 'login'
	})

	// route for the SignUp page
	.when('/signUp', {
		templateUrl : '/html/DoctorSignUp.html',
		controller : 'signUp'
	})

	// route for the About page
	.when('/about', {
		templateUrl : 'http://srydada.96.lt/html/about.html',
		controller : 'about'
	})

	// route for the Contact page	
	.when('/contact', {
		templateUrl : 'http://srydada.96.lt/html/contact.html',
		controller : 'contact'
	});
});

