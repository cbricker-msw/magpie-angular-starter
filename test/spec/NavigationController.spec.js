'use strict'

describe("Given AuthenticationController", function () {
    var scope, rootScope, controller, q, location, mockAuthenticationService;

    beforeEach(function () {
        module('msa.controllers');

        mockAuthenticationService = jasmine.createSpyObj('authenticationService', [ 'login', 'logout' ]);

        inject(function ($rootScope, $controller, $q, $location) {
            scope = $rootScope.$new();
            q = $q;
            rootScope = $rootScope;
            location = $location;

            controller = $controller('NavigationController', {
                $scope: scope,
                authenticationService: mockAuthenticationService
            });
        });
    });

    it("logout routes to /login on success", function () {
        location.path("/home");

        scope.logout();

        expect(location.path()).toEqual('/login');
        expect(mockAuthenticationService.logout).toHaveBeenCalled();
        expect(scope.authenticated).toBeFalsy();
    });

    it("receiving loggedIn should set authenticated to true", function () {
        scope.authenticated = false;

        rootScope.$broadcast('loggedIn');
        rootScope.$apply();

        expect(scope.authenticated).toBeTruthy();
    });

});