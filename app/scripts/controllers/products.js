'use strict';

angular.module('helloApp')
  .controller('ProductsCtrl', function ($scope, $http) {

   $scope.productsArray = [
        {"id": 1, "name": 'U-Pulser',  "desc": "Rotary MWD + Gamma (175\xB0). Less Power Consumption, easy maintenance, works up to 175\xB0C and 20000 psi." },
        {"id": 2, "name": "UEM", "desc": "EM MWD + Gamma (175\xB0), Good for Air/Mist/foaming Drilling, transmitting rate up to 12bps."},
        {"id": 3, "name": "GOBT",  "desc": "Near Bit Cont Inc & Focused  Gamma (175\xB0). Good for thin pay zone geosteering, wellpath smoothness and formation identification. Max transmitting distance up to 100 meters."},
        {"id": 4, "name": "Dual Telemetry ", "desc": "(Pulse + EM) MWD + Gamma (175\xB0). Two way communication between surface and downhole. "},
         
   ];
 
  $http.get('https://utargetenergy.github.io/products.md').then(function(response) {
    $scope.p1 = response.data;
  });

});
