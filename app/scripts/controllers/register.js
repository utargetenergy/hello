/**
 * Created by AMirza on 6/11/17.
 */
'use strict';

angular.module('helloApp')
    .controller('RegisterCtrl', ['$scope', function ($scope) {
    $scope.register = function () {
        $scope.message = "Welcome " + $scope.user.email;
    }
}]);
