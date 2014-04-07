'use strict';

var app = angular.module('magpieStarterApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'msa.services',
    'msa.controllers'
]);

app.config([ '$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    //$locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeController',
            controllerAs: 'home'
        })
        .when('/login', {
            templateUrl: 'views/auth.html',
            controller: 'LoginController',
            controllerAs: 'login'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.factory('authInterceptor', function ($rootScope, $q, $window, $location) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Basic ' + $window.sessionStorage.token;
            }
            return config;
        },

        responseError: function (rejection) {
            if (rejection.status === 401) {
                // handle case where the user is not authenticated
                $location.path('/login');
            }
            return $q.reject(rejection);
        }
    };
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});