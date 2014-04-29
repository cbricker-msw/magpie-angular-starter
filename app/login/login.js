'use strict';

angular.module('msa.login', [ 'ngRoute', 'msa.common.security' ])

.config([ '$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'login/login.html',
            controller: 'LoginController',
            controllerAs: 'login'
        }
    );
}]);
