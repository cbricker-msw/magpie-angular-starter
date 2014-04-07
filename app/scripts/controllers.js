'use strict';

var controllers = angular.module('msa.controllers', [ 'msa.services' ]);

controllers.controller('HomeController', [ '$location', 'securityService', function ($location, securityService) {
    this.data = securityService.getCurrentUser();
    if (!this.data) {
        $location.path('/login');
    }
}]);

controllers.controller('LoginController', [ '$location', 'securityService', function ($location, securityService) {
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
                if (errors) {
                    login.error = 'Unable to login: ' + errors;
                } else {
                    login.error = 'Cannot connect to server';
                }
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
