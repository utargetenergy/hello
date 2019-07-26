'use strict';

angular.module('helloApp')
  .controller('ContactCtrl', function ($scope, $http, Page) {
  Page.setTitle("Contact");
 
  $http.get('https://utargetenergy.github.io/contact.md').then(function(response) {
    $scope.p1 = response.data;
    console.log($scope.p1);
  });

});
