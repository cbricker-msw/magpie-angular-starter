'use strict'

var services = angular.module('msa.services', []);

services.factory('userService', [ '$http', '$q', function ($http, $q) {
    var currentUser = {};

    return {
        get: function () {
            var deferred = $q.defer();
            $http.get('http://localhost:3001/user')
                .success(function (data) {
                    currentUser = data;
                    deferred.resolve();
                })
                .error(function (data) {
                    deferred.reject(data);
                });
            return deferred.promise;
        },

        currentUser: function () {
            return currentUser;
        },

        clearCurrentUser: function () {
            currentUser = {};
        }
    };
}]);

services.factory('authenticationService', [ '$q', '$rootScope', '$window', 'userService', function ($q, $rootScope, $window, userService) {
    return {
        login: function (username, password) {
            var deferred = $q.defer();
            var words = CryptoJS.enc.Utf8.parse(username + ":" + password);
            $window.sessionStorage.token = CryptoJS.enc.Base64.stringify(words);

            userService.get().then(
                function () {
                    $rootScope.$broadcast('loggedIn');
                    deferred.resolve();
                },
                function (errors) {
                    delete $window.sessionStorage.token;
                    deferred.reject(errors);
                }
            );
            return deferred.promise;
        },

        logout: function () {
            delete $window.sessionStorage.token;
            userService.clearCurrentUser();
        }
    };
}]);