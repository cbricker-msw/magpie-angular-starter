'use strict';

var controllers = angular.module('msa.controllers', [ 'msa.services' ]);

controllers.controller('HomeController', [ '$location', 'securityService', function ($location, securityService) {
    this.data = securityService.getCurrentUser();
    if (!this.data) {
        $location.path("/login");
    }
}]);

controllers.controller('LoginController', [ '$location', 'securityService', function ($location, securityService) {
    this.credentials = {
        username: '',
        password: ''
    };
    this.error = "";
    this.isAuthenticated = securityService.isAuthenticated;

    this.login = function (credentials) {
        var _this = this;
        securityService.login(credentials).then(
            function () {
                $location.path("/");
            },
            function (errors) {
                if (errors) {
                    _this.error = "Unable to login: " + errors;
                } else {
                    _this.error = "Cannot connect to server";
                }
             }
        );
    };

    this.logout = function () {
        securityService.logout();
        $location.url('/');
    };

}]);

controllers.controller('HeaderController', [ 'securityService', function (securityService) {
    this.isAuthenticated = securityService.isAuthenticated;
}]);
