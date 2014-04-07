'use strict';

describe('Given securityService', function () {
    var httpBackend, q, rootScope, window, service, deferred, result, error, resultReturned;
    var mockCryptographyService;

    beforeEach(function () {
        result = undefined;
        error = undefined;
        deferred = undefined;
        resultReturned = { userId: 15, name: 'Magpie User' };

        module('msa.services');

        mockCryptographyService = jasmine.createSpyObj('cryptographyService', [ 'base64Encode' ]);

        module(function ($provide) {
            $provide.value('cryptographyService', mockCryptographyService);
        });

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
            var username = 'test-username';
            var password = 'test-password';
            var credentials = { username: username, password: password };
            var tokenSource = username + ':' + password;
            var token = 'abcd';

            deferred = q.defer();
            httpBackend.expectGET('http://localhost:3001/login').respond(200, resultReturned);
            mockCryptographyService.base64Encode.andReturn(token);

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
            expect(mockCryptographyService.base64Encode).toHaveBeenCalledWith(tokenSource);
        });

        it('should handle a failed login', function () {
            var username = 'test-username';
            var password = 'test-password';
            var credentials = { username: username, password: password };
            var errorResult = { status: 401, data: 'Not Authorized' };
            var tokenSource = username + ':' + password;
            var token = 'abcd';

            deferred = q.defer();
            httpBackend.expectGET('http://localhost:3001/login').respond(401, 'Not Authorized');
            mockCryptographyService.base64Encode.andReturn(token);

            service.login(credentials).then(
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
            expect(mockCryptographyService.base64Encode).toHaveBeenCalledWith(tokenSource);
        });
    });

    describe('logout', function () {
        it('should cleanup the current user information', function () {
            service.logout();

            expect(window.sessionStorage.token).toBeUndefined();
        });
    });

});
