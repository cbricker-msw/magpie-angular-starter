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
    'msa.common.resources',
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