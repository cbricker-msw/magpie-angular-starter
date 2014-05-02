'use strict';

describe('Given LoginController', function () {
    var scope, rootScope, controller, q, location, translate, mockSecurityService;

    beforeEach(function () {
        module('msa.login');
        module('ngRoute');
        module('pascalprecht.translate');

        mockSecurityService = jasmine.createSpyObj('securityService', [ 'login', 'logout' ]);

        inject(function ($rootScope, $controller, $q, $location, $translate) {
            scope = $rootScope.$new();
            q = $q;
            rootScope = $rootScope;
            location = $location;
            translate = $translate;

            controller = $controller('LoginController', {
                securityService: mockSecurityService
            });
        });

    });

    it('login routes to /home on success', function () {
        var username = 'test-username';
        var password = 'test-password';
        var credentials = { username: username, password: password };

        location.path('/');

        var deferred = q.defer();
        mockSecurityService.login.andReturn(deferred.promise);

        controller.login(credentials);
        deferred.resolve();
        rootScope.$apply();

        expect(location.path()).toEqual('/');
        expect(mockSecurityService.login).toHaveBeenCalledWith(credentials);
        expect(controller.error).toBe('');
    });

    it('login fails', function () {
        var username = 'test-username';
        var password = 'test-password';
        var credentials = { username: username, password: password };

        location.path('/');

        var deferred = q.defer();
        mockSecurityService.login.andReturn(deferred.promise);

        controller.login(credentials);
        deferred.reject({ status: 404 });
        rootScope.$apply();

        expect(location.path()).toEqual('/');
        expect(mockSecurityService.login).toHaveBeenCalledWith(credentials);
        expect(scope.error).not.toBe('');
    });

    it('logout succeeds', function () {
        controller.logout();

        expect(location.path()).toEqual('/');
        expect(mockSecurityService.logout).toHaveBeenCalled();
    });

});