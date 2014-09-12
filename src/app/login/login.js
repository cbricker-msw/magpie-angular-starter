'use strict';

angular.module('msa.login', [
    'msa.common.security'
])

.config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/login/login.html',
                controller: 'LoginController',
                controllerAs: 'login'
            }
        );
    }
]);
