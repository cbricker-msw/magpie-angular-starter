'use strict';

var services = angular.module('msa.services', []);

services.factory('securityService', [ '$q', '$rootScope', '$window', '$http', function ($q, $rootScope, $window, $http) {
    var service = {
        currentUser: null,

        login: function (credentials) {
            var deferred = $q.defer();
            var words = CryptoJS.enc.Utf8.parse(credentials.username + ":" + credentials.password);
            $window.sessionStorage.token = CryptoJS.enc.Base64.stringify(words);

            $http.get('http://localhost:3001/login').then(
                function (result) {
                    service.currentUser = result.data;
                    deferred.resolve(service.currentUser);
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
            service.currentUser = null;
        },

        isAuthenticated: function () {
            return !!$window.sessionStorage.token;
        },

        getCurrentUser: function () {
            return service.currentUser;
        }
    };
    return service;
}]);