'use strict';

angular.module('helloApp')
  .controller('ServicesCtrl', function ($scope, $http) {
 
  $http.get('https://utargetenergy.github.io/services.md').then(function(response) {
    $scope.p1 = response.data;
  });

});
