'use strict';

angular.module('helloApp')
  .controller('HseCtrl', function ($scope, $http, Page) {
    Page.setTitle("HSE");

  $http.get('https://utenergy.ca/hse.md').then(function(response) {
    $scope.p1 = response.data;
  });
});
