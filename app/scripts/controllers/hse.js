'use strict';

angular.module('helloApp')
  .controller('HseCtrl', function ($scope, $http, Page) {
    Page.setTitle("HSE");

  $http.get('https://www.uts-canada.com/hse.md').then(function(response) {
    $scope.p1 = response.data;
  });
});
