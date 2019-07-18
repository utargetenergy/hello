'use strict';

angular.module('helloApp')
  .controller('HseCtrl', function ($scope, $http) {

  $http.get('https://utargetenergy.github.io/hse.md').then(function(response) {
    $scope.p1 = response.data;
  });
});
