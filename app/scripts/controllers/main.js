'use strict';

angular.module('helloApp')
  .controller('MainCtrl',  function ($scope, $route, $routeParams, $location, Page) {
    this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;

    $scope.useContact = true;
    $scope.useServices = false;

    console.log(" " + this.$route + "loc:" + this.$location + "route: " + this.$routeParams);
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };

    $scope.Page= Page;
  }) 
  .controller('HomeCtrl',  function ($scope, $http, Page) {

    Page.setTitle("Home");

    $scope.titleIntro = "A Next Generation MWD/LWD Tool Company";
    $scope.titleDesc = "We love MWD and the work we do. We work closely with our clients to deliver the best possible solutions for their needs.";

    $http.get('https://utenergy.ca/main.md').then(function(response) {
      $scope.p1 = response.data;
    });

    function getIEVersion() {
      var sAgent = window.navigator.userAgent;
      var Idx = sAgent.indexOf("MSIE");

      // If IE, return version number.
      if (Idx > 0) {
        return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));
      }
      // If IE 11 then look for Updated user agent string.
      else if (!!navigator.userAgent.match(/Trident\/7\./))  {
        return 11;
      }
      else {
        return 0; //It is not IE
      }
    }
    $scope.ie = getIEVersion(); 



});
