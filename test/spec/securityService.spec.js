'use strict';

describe('Given securityService', function () {
    var httpBackend, q, rootScope, window, service, deferred, result, error, resultReturned;

    beforeEach(function () {
        result = undefined;
        error = undefined;
        deferred = undefined;
        resultReturned = { userId: 15, name: "Magpie User" };

        module('msa.services');

        inject(function ($httpBackend, $rootScope, $q, $window, securityService) {
            httpBackend = $httpBackend;
            rootScope = $rootScope;
            q = $q;
            window = $window;
            service = securityService;
        });
    });

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    describe('login', function () {
        it('should handle a successful login', function () {
            var username = "test-username";
            var password = "test-password";
            var credentials = { username: username, password: password };
            var token = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(username + ":" + password));

            deferred = q.defer();
            httpBackend.expectGET('http://localhost:3001/login').respond(
                200, resultReturned);

            service.login(credentials).then(
                function (testResult) {
                    result = testResult;
                },
                function (testError) {
                    error = testError;
                }
            );
            httpBackend.flush();
            deferred.resolve();
            rootScope.$apply();

            expect(error).toBeUndefined();
            expect(window.sessionStorage.token).toBe(token);
        });

        it('should handle a failed login', function () {
            var username = "test-username";
            var password = "test-password";
            var errorResult = { status: 401, data: "Not Authorized" };

            deferred = q.defer();
            httpBackend.expectGET('http://localhost:3001/login').respond(401, 'Not Authorized');

            service.login(username, password).then(
                function (testResult) {
                    result = testResult;
                },
                function (testError) {
                    error = testError;
                }
            );
            httpBackend.flush();
            deferred.reject(errorResult);
            rootScope.$apply();

            expect(result).toBeUndefined();
            expect(error.status).toBe(errorResult.status);
            expect(window.sessionStorage.token).toBeUndefined();
        });
    });

    describe('logout', function () {
        it('should cleanup the current user information', function () {
            service.logout();

            expect(window.sessionStorage.token).toBeUndefined();
        });
    });

});