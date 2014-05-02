'use strict';

describe('Given authInterceptor', function () {
    var httpBackend, q, rootScope, window, location, interceptor, deferred, result, error, resultReturned;

    beforeEach(function () {
        result = undefined;
        error = undefined;
        deferred = undefined;
        resultReturned = { userId: 15, name: 'Magpie User' };

        module('msa.common.security');

        inject(function ($httpBackend, $location, $rootScope, $q, $window, authInterceptor) {
            httpBackend = $httpBackend;
            location = $location;
            rootScope = $rootScope;
            q = $q;
            window = $window;
            interceptor = authInterceptor;
        });

        httpBackend.whenGET('assets/i18n/locale-en.json').respond(200, {});
    });

    describe('request', function () {
        it('should set the Authorization header when a token is defined and leave the other headers alone', function () {
            window.sessionStorage.token = 'abcd';
            var config = {
                headers: { ContentType: 'application/json' }
            };

            var result = interceptor.request(config);

            expect(result.headers.ContentType).toBe('application/json');
            expect(result.headers.Authorization).toEqual('Basic ' + window.sessionStorage.token);
        });

        it('should not add the Authorization header when the token is not defined and it sets config.headers to {} if they do not exist', function () {
            delete window.sessionStorage.token;
            var config = {};

            var result = interceptor.request(config);

            expect(result.headers).toEqual({});
            expect(result.headers.Authorization).toBeUndefined();
        });
    });

    describe('responseError', function () {
        it('should change the $location.path to /login for a 401', function () {
            var rejection = { status: 401 };
            location.path('/startTest');

            interceptor.responseError(rejection);
            rootScope.$apply();

            expect(location.path()).toEqual('/login');
        });

        it('should not change the $location.path for anything except 401', function () {
            var rejection = { status: 403 };
            location.path('/startTest');

            interceptor.responseError(rejection);
            rootScope.$apply();

            expect(location.path()).toEqual('/startTest');
        });
    });

});
