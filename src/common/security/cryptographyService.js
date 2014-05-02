'use strict';

angular.module('msa.common.security')

.factory('cryptographyService', function () {
    return {
        base64Encode: function (stringToEncode) {
            return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(stringToEncode));
        }
    };
});