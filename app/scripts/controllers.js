'use strict';

var controllers = angular.module('msa.controllers', [ 'msa.services' ]);

controllers.controller('HomeController', [ '$location', 'securityService', function ($location, securityService) {
    this.data = securityService.getCurrentUser();
    if (!this.data) {
        $location.path('/login');
    }
}]);

controllers.controller('LoginController', [ '$location', '$translate', 'securityService', function ($location, $translate, securityService) {
    this.credentials = {
        username: '',
        password: ''
    };
    this.error = '';
    this.isAuthenticated = securityService.isAuthenticated;

    this.login = function (credentials) {
        var login = this;
        securityService.login(credentials).then(
            function () {
                $location.path('/');
            },
            function (errors) {
                $translate('LOGIN_ERROR', { status: errors.status, data: errors.data }).then(function (message) {
                    login.error = message;
                });
            }
        );
    };

    this.logout = function () {
        securityService.logout();
        $location.url('/');
    };

}]);

controllers.controller('HeaderController', [ '$location', 'securityService', function ($location, securityService) {
    this.isAuthenticated = securityService.isAuthenticated;

    this.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    };
}]);
