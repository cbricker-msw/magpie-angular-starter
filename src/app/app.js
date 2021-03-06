'use strict';

angular.module('magpieStarterApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'msa.home',
    'msa.login',
    'msa.common.security',
    'msa.common.models',
    'msa.common.resources',
    'pascalprecht.translate'
])

.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$translateProvider',
    function ($stateProvider, $urlRouterProvider, $translateProvider) {
        $urlRouterProvider
            .otherwise('/');

        $translateProvider.useStaticFilesLoader({
            prefix: 'assets/i18n/locale-',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('en');
    }
])

.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
})

.controller('HeaderController', [
    '$location',
    'securityService',
    function ($location, securityService) {
        this.isAuthenticated = securityService.isAuthenticated;

        this.isActive = function(viewLocation) {
            return viewLocation === $location.path();
        };
    }
]);