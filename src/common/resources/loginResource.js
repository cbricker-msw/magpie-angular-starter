'use strict';

angular.module('msa.common.resources')

.factory('Login', [ '$resource', function ($resource) {
    return $resource('http://localhost:3001/login');
}]);