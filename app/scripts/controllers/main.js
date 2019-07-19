'use strict';

angular.module('helloApp')
  .controller('MainCtrl', function ($scope, $http, $route, $routeParams, $location) {

    this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;

    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };

    $scope.titleIntro = "A Next Generation MWD/LWD Tool Company";
    $scope.titleDesc = "We love MWD and the work we do. We work closely with our clients to deliver the best possible solutions for their needs.";

    $http.get('https://utargetenergy.github.io/main.md').then(function(response) {
      $scope.p1 = response.data;
    });

})
.controller('BookCtrl', ['$routeParams', function BookCtrl($routeParams) {
  this.name = 'BookCtrl';
  this.params = $routeParams;
}])
;
