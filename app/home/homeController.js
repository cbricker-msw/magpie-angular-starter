'use strict';

angular.module('msa.home')

.controller('HomeController', [ '$location', 'securityService', function ($location, securityService) {
    this.user = securityService.getCurrentUser();
    if (!this.user) {
        $location.path('/login');
    }
}]);
