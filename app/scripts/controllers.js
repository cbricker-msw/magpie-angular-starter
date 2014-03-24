'use strict';

var controllers = angular.module('msa.controllers', [ 'msa.services' ]);

controllers.controller('HomeController', ['$scope', 'userService', function ($scope, userService) {
    $scope.user = {
        data: userService.currentUser()
    };
}]);

controllers.controller('AuthController', ['$scope', '$location', 'authenticationService', function ($scope, $location, authenticationService) {
    $scope.auth = {};

    $scope.login = function () {
        authenticationService.login($scope.auth.username, $scope.auth.password).then(
            function () {
                $location.url('/home');
            },
            function (errors) {
                if (errors) {
                    $scope.error = "Unable to login: " + errors;
                } else {
                    $scope.error = "Cannot connect to server";
                }
             }
        );
    };
}]);

controllers.controller('NavigationController', ['$scope', '$location', 'authenticationService', function ($scope, $location, authenticationService) {
    $scope.authenticated = false;

    $scope.logout = function () {
        authenticationService.logout();
        $scope.authenticated = false;
        $location.url('/login');
    };

    $scope.$on('loggedIn', function () {
        $scope.authenticated = true;
    });
}]);