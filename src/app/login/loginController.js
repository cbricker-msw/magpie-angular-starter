'use strict';

angular.module('msa.login')

.controller('LoginController', [
    '$state',
    '$translate',
    'securityService',
    function ($state, $translate, securityService) {
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
                    $state.go('home');
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
            $state.reload();
        };

    }
]);