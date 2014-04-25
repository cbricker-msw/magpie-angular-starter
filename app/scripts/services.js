'use strict';

var services = angular.module('msa.services', [ 'msa.models' ]);

services.factory('securityService', [ '$q', '$rootScope', '$window', '$http', 'cryptographyService', 'User', function ($q, $rootScope, $window, $http, cryptographyService, User) {
    var service = {
        currentUser: null,

        login: function (credentials) {
            var deferred = $q.defer();
            $window.sessionStorage.token = cryptographyService.base64Encode(credentials.username + ':' + credentials.password);

            $http.get('http://localhost:3001/login').then(
                function (result) {
                    service.currentUser = User.build(result.data);
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

services.factory('cryptographyService', function () {
    return {
        base64Encode: function (stringToEncode) {
            return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(stringToEncode));
        }
    };
});