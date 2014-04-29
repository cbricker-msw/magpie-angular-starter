'use strict';

describe('Given cryptographyService', function () {
    var service;

    beforeEach(function () {
        module('msa.common.security');

        inject(function (cryptographyService) {
            service = cryptographyService;
        });
    });

    describe('base64Encode', function () {
        it('should base64 encode a string using CryptoJS', function () {
            var username = 'test-username';
            var password = 'test-password';
            var credentials = username + ':' + password;
            var encodedString = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(credentials));

            expect(service.base64Encode(credentials)).toEqual(encodedString);
        });
    });

});