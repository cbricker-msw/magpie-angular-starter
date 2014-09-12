'use strict';

angular.module('msa.home', [ 'msa.common.security' ])

.config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/home/home.html',
                controller: 'HomeController',
                controllerAs: 'home'
            }
        );
    }
]);