'use strict';

angular.module('msa.common.security')

.factory('securityService', [ '$q', '$rootScope', '$window', 'Login', 'cryptographyService', 'User', function ($q, $rootScope, $window, Login, cryptographyService, User) {
    var service = {
        currentUser: null,

        login: function (credentials) {
            var deferred = $q.defer();
            $window.sessionStorage.token = cryptographyService.base64Encode(credentials.username + ':' + credentials.password);

            Login.get(
                function (result) {
                    service.currentUser = User.build(result);
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
