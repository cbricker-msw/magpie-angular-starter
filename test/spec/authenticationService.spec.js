'use strict'

describe('Given authenticationService', function () {
    var mockUserService, q, rootScope, window, service, deferred, result, error;

    beforeEach(function () {
        result = undefined;
        error = undefined;
        deferred = undefined;
        module('msa.services');

        mockUserService = jasmine.createSpyObj('userService', [ 'get', 'clearCurrentUser' ]);

        module(function ($provide) {
            $provide.value('userService', mockUserService);
        });

        inject(function ($rootScope, $q, $window, authenticationService) {
            rootScope = $rootScope;
            q = $q;
            window = $window;
            service = authenticationService;
        });

        spyOn(rootScope, '$broadcast').andCallThrough();

    });

    describe('login', function () {
        it('should handle a successful login', function () {
            var username = "test-username";
            var password = "test-password";
            var token = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(username + ":" + password));

            deferred = q.defer();
            mockUserService.get.andReturn(deferred.promise);

            service.login(username, password).then(
                function (testResult) {
                    result = testResult;
                },
                function (testError) {
                    error = testError;
                }
            );
            deferred.resolve();
            rootScope.$apply();

            expect(error).toBeUndefined();
            expect(window.sessionStorage.token).toBe(token);
            expect(rootScope.$broadcast).toHaveBeenCalledWith('loggedIn');
            expect(mockUserService.get).toHaveBeenCalled();
        });

        it('should handle a failed login', function () {
            var username = "test-username";
            var password = "test-password";
            var errorResult = { status: 401, data: "Not Authorized" };

            deferred = q.defer();
            mockUserService.get.andReturn(deferred.promise);

            service.login(username, password).then(
                function (testResult) {
                    result = testResult;
                },
                function (testError) {
                    error = testError;
                }
            );
            deferred.reject(errorResult);
            rootScope.$apply();

            expect(result).toBeUndefined();
            expect(error).toBe(errorResult);
            expect(window.sessionStorage.token).toBeUndefined();
            expect(rootScope.$broadcast).not.toHaveBeenCalledWith('loggedIn');
            expect(mockUserService.get).toHaveBeenCalled();
        });
    });

    describe('logout', function () {
        it('should cleanup the current user information', function () {
            service.logout();

            expect(window.sessionStorage.token).toBeUndefined();
            expect(mockUserService.clearCurrentUser).toHaveBeenCalled();
        });
    });

});