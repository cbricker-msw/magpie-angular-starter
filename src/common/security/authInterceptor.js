'use strict';

angular.module('msa.common.security')

.factory('authInterceptor', function ($q, $window, $location) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Basic ' + $window.sessionStorage.token;
            }
            return config;
        },

        responseError: function (rejection) {
            if (rejection.status === 401) {
                // handle case where the user is not authenticated
                $location.path('/login');
            }
            return $q.reject(rejection);
        }
    };
});