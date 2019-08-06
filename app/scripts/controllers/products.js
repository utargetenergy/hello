'use strict';

angular.module('helloApp')
    .service('ProductService', function($http) {
        this.getData = function(successHandler, failureHandler, item) {
            $http.get('https://utargetenergy.github.io/' + item).then(function(response){
        successHandler(response);    //data can't be used outside this function
     }, function(response) {
        failureHandler(response);
     })

    }
   }) 
   .controller('ProductCtrl', ['$routeParams', '$http', 'ProductService', '$scope', function ProductCtrl($routeParams, $http, ProductService, $scope) {
    this.name = 'ProductCtrl';
    this.params = $routeParams;
    var p = '';

    var md = $routeParams.markdownId;

    $scope.verbose = false;

    function successHandler(res) {
        p = res;
        $scope.p=res.data;
    }

    function failureHandler(res) {
        p = res;
        $scope.p = "error";
    }
    ProductService.getData(successHandler, failureHandler, md);
    
  }])
  .controller('ProductsCtrl', function ($route, $routeParams, $location, $scope, $http, Page) {

    this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;

    Page.setTitle("Products");

   $scope.productsArray = [
        {"id": 1, "name": 'U-Pulser',  
                  "desc": "Rotary MWD + Gamma (175\xB0). Less Power Consumption, easy maintenance, works up to 175\xB0C and 20000 psi.",
                  "href": "Product/UPulser/image/slide9740_image035.png/markdown/pulser"
        },
        {"id": 2, "name": "UEM", 
                  "desc": "EM MWD + Gamma (175\xB0), Good for Air/Mist/foaming Drilling, transmitting rate up to 12bps.",
                  "href": "Product/UEM/image/em.png/markdown/em"
        },
        {"id": 3, "name": "GOBT", 
                  "desc": "Near Bit Cont Inc & Focused  Gamma (175\xB0). Good for thin pay zone geosteering, wellpath smoothness and formation identification. Max transmitting distance up to 100 meters.",
                  "href": "Product/GOBT/image/slide9740_image037.png/markdown/gobt"
        },
        {"id": 4, "name": "Dual Telemetry ", 
                   "desc": "(Pulse + EM) MWD + Gamma (175\xB0). Two way communication between surface and downhole. ",
                   "href": "Product/DualTelemetry/image/slide9740_image041.jpg/markdown/duo"

        },
         
   ];


 
  $http.get('https://utargetenergy.github.io/products.md').then(function(response) {
    $scope.p1 = response.data;
  });

});
