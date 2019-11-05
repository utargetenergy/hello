'use strict';

angular.module('helloApp')
  .controller('ContactCtrl', function ($scope, $http, Page, $route) {
  Page.setTitle("Contact");

   $scope.reload = function() {
        $route.reload();
    }
     
  $http.get('https://utenergy.ca/contact.md').then(function(response) {
    $scope.p1 = response.data;
    console.log($scope.p1);
  });

})
  .controller('ParamsCtrl', function ($scope, Page, $routeParams) {
  Page.setTitle("Params");
    $scope.paramValue = $routeParams.id;
});


