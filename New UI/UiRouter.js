//Already define scotchApp in Login Router, so not require to define it again....
scotchApp.config(function ($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl: 'New%20UI/html/home.html',
            controller: 'home'
        });
});
