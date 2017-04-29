var app = angular.module('myApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl: 'New%20UI/html/home.html',
            controller: 'home'
        });
});
