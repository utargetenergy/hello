'use strict';

angular.module('helloApp')
  .controller('MainCtrl', function ($scope, $http, $route, $routeParams, $location) {

    this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;


    $scope.titleIntro = "A Next Generation MWD/LWD Tool Company";
    $scope.titleDesc = "We love MWD and the work we do. We work closely with our clients to deliver the best possible solutions for their needs.";
    $scope.p1= "## About Us\n**U-Target Energy Ltd.** is a MWD/LWD tool R&D and manufacturing company, based in Calgary, Canada. Our Main Engineers have more than 15 years of MWD/LWD tool R&D experience in North America. Due to our new technology and innovation, we are financially supported by Federal and Provincial governments.";

  $http.get('https://utargetenergy.github.io/main.md').then(function(response) {
    $scope.p1 = response.data;
  });

})
.controller('BookCtrl', ['$routeParams', function BookCtrl($routeParams) {
  this.name = 'BookCtrl';
  this.params = $routeParams;
}])
;
