'use strict'

describe('Given userService', function () {
    var http, httpBackend, q, window, rootScope, service, deferred, result, error, resultReturned, token;

    beforeEach(function () {
        result = undefined;
        error = undefined;
        deferred = undefined;
        resultReturned = { userId: 15, name: "Magpie User" };
        var username = "test-username";
        var password = "test-password";
        token = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(username + ":" + password));
        module('msa.services');

        inject(function ($http, $httpBackend, $q, $window, $rootScope, userService) {
            http = $http;
            httpBackend = $httpBackend;
            q = $q;
            service = userService;
            window = $window;
            rootScope = $rootScope;
        });

        window.sessionStorage.token = token;
    });

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    describe('get', function () {
        it('successfully retrieves user details', function () {
            deferred = q.defer();

            httpBackend.expectGET('http://localhost:3001/user').respond(
                200, resultReturned);

            service.get().then(
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
            var currentUser = service.currentUser();

            expect(error).toBeUndefined();
            expect(result).toBeUndefined();
            expect(currentUser).toEqual(resultReturned);
        });

        it('should handle an unauthorized get', function () {
            deferred = q.defer();

            httpBackend.expectGET('http://localhost:3001/user').respond(401, 'Not Authorized');

            service.get().then(
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
            var currentUser = service.currentUser();

            expect(error).toBe('Not Authorized');
            expect(result).toBeUndefined();
            expect(currentUser).toEqual({});
        });
    });
});