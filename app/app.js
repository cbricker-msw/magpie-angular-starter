'use strict';

var app = angular.module('magpieStarterApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'msa.home',
    'msa.login',
    'msa.common.security',
    'msa.common.models',
    'pascalprecht.translate'
]);

app.config([ '$routeProvider', '$translateProvider', function ($routeProvider, $translateProvider) {
    $routeProvider
        .otherwise({
            redirectTo: '/'
        });

    $translateProvider.useStaticFilesLoader({
        prefix: 'assets/i18n/locale-',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('en');
}]);

app.factory('authInterceptor', function ($q, $window, $location) {
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

app.controller('HeaderController', [ '$location', 'securityService', function ($location, securityService) {
    this.isAuthenticated = securityService.isAuthenticated;

    this.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    };
}]);