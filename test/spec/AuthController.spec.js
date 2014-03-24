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

            controller = $controller('AuthController', {
                $scope: scope,
                authenticationService: mockAuthenticationService
            });
        });
    });

    it("login routes to /home on success", function () {
        var username = "test-username";
        var password = "test-password";

        scope.auth = { username: username, password: password };
        location.path("/");

        var deferred = q.defer();
        mockAuthenticationService.login.andReturn(deferred.promise);

        scope.login();
        deferred.resolve();
        rootScope.$apply();

        expect(location.path()).toEqual('/home');
        expect(mockAuthenticationService.login).toHaveBeenCalledWith(username, password);
        expect(scope.error).not.toBeDefined();
    });

    it("login fails", function () {
        var username = "test-username";
        var password = "test-password";

        scope.auth = { username: username, password: password };
        location.path("/");

        var deferred = q.defer();
        mockAuthenticationService.login.andReturn(deferred.promise);

        scope.login();
        deferred.reject();
        rootScope.$apply();

        expect(location.path()).toEqual('/');
        expect(mockAuthenticationService.login).toHaveBeenCalledWith(username, password);
        expect(scope.error).toBeDefined();
    });

});