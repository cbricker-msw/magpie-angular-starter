'use strict';

describe('Given LoginController', function () {
    var scope, rootScope, controller, q, state, translate, mockSecurityService;

    beforeEach(function () {
        module('msa.login');
        module('pascalprecht.translate');

        mockSecurityService = jasmine.createSpyObj('securityService', [ 'login', 'logout' ]);

        inject(function ($rootScope, $controller, $q, $state, $translate) {
            scope = $rootScope.$new();
            q = $q;
            rootScope = $rootScope;
            state = $state;
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

        var deferred = q.defer();
        mockSecurityService.login.andReturn(deferred.promise);
        spyOn(state, 'go');

        controller.login(credentials);
        deferred.resolve();
        rootScope.$apply();

        expect(state.go).toHaveBeenCalledWith('home');
        expect(mockSecurityService.login).toHaveBeenCalledWith(credentials);
        expect(controller.error).toBe('');
    });

    it('login fails', function () {
        var username = 'test-username';
        var password = 'test-password';
        var credentials = { username: username, password: password };

        var deferred = q.defer();
        mockSecurityService.login.andReturn(deferred.promise);

        controller.login(credentials);
        deferred.reject({ status: 404 });
        rootScope.$apply();

        expect(mockSecurityService.login).toHaveBeenCalledWith(credentials);
        expect(scope.error).not.toBe('');
    });

    it('logout succeeds', function () {
        spyOn(state, 'reload');

        controller.logout();
        rootScope.$apply();

        expect(state.reload).toHaveBeenCalled();
        expect(mockSecurityService.logout).toHaveBeenCalled();
    });

});