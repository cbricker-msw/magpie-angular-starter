'use strict';

angular.module('msa.home', [ 'ngRoute', 'msa.common.security' ])

.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home.html',
            controller: 'HomeController',
            controllerAs: 'home'
        }
    );
});