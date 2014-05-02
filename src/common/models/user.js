'use strict';

angular.module('msa.common.models')

.factory('User', function () {

    function User(userId, firstName, lastName) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    User.prototype.getFullName = function() {
        return this.firstName + ' ' + this.lastName;
    };

    User.build = function (data) {
        return new User(data.userId, data.firstName, data.lastName);
    };

    return User;
});