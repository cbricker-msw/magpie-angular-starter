'use strict';

describe('Given securityService', function () {
    var factory;

    beforeEach(function () {
        module('msa.common.models');

        inject(function (User) {
            factory = User;
        });

    });

    describe('build', function () {
        it('should build a user and get the full name', function () {
            var userId = 8;
            var firstName = 'test-firstname';
            var lastName = 'test-lastname';
            var data = { userId: userId, firstName: firstName, lastName: lastName };

            var actual = factory.build(data);
            expect(actual.firstName).toEqual(firstName);
            expect(actual.getFullName()).toEqual(actual.firstName + ' ' + actual.lastName);
        });

    });

});
