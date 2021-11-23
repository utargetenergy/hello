'use strict';

angular.module('helloApp')
    .service('ProductService', function($http) {
        this.getData = function(successHandler, failureHandler, item) {
            $http.get('https://www.uts-canada.com/' + item).then(function(response){
        successHandler(response);    //data can't be used outside this function
     }, function(response) {
        failureHandler(response);
     })

    };
   }) 
   .controller('ProductCtrl', ['$routeParams', '$http', 'ProductService', '$scope', '$sce', function ProductCtrl($routeParams, $http, ProductService, $scope, $sce) {
    this.name = 'ProductCtrl';
    this.params = $routeParams;
    $scope.start = "30%";
    $scope.name = $routeParams.productId;
    if($scope.name.match(/Dual/)) {
        $scope.name="Dual";
    }

    var p = '';

    var md = $routeParams.markdownId;
    if($routeParams.productId==="DualTelemetry") {
        $scope.start = "10%";
    }

    $scope.verbose = false;

    function successHandler(res) {
        p = res;
        $scope.p=res.data;
    }

    function failureHandler(res) {
        p = res;
        $scope.p = "error";
    }

    $scope.gobturl =  "http://utargetenergy.github.io/docs/Near Bit Sub Data Sheet.pdf";
    ProductService.getData(successHandler, failureHandler, md);
 $scope.clickMe = function () {
    var url =  "http://www.uts-canada.com/docs/Near Bit Sub Data Sheet.pdf";
    var requestData = {};
    var header = {'Content-Type': "application/pdf",
                  'Accept': "application/pdf" };
    var trustedUrl2 = $sce.trustAsResourceUrl(url);

    $http.post(trustedUrl2,requestData, {responseType:'arraybuffer',headers:header })
            .success(function (response) {
                var file = new Blob([response], {type: 'application/pdf'});

                var isChrome = !!window.chrome && !!window.chrome.webstore;
                var isIE = /*@cc_on!@*/false || !!document.documentMode;
                var isEdge = !isIE && !!window.StyleMedia;


                if (isChrome){
                    var url = window.URL || window.webkitURL;

                    var downloadLink = angular.element('<a></a>');
                    downloadLink.attr('href',url.createObjectURL(file));
                    downloadLink.attr('target','_self');
                    downloadLink.attr('download', 'invoice.pdf');
                    downloadLink[0].click();
                }
                else if(isEdge || isIE){
                    window.navigator.msSaveOrOpenBlob(file,'invoice.pdf');

                }
                else {
                    var fileURL = URL.createObjectURL(file);
                    window.open(fileURL);
                }

            })



      };
    
  }])
  .controller('ProductsCtrl', function ($route, $routeParams, $location, $scope, $http, Page) {

    this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;

    Page.setTitle("Products");
   $scope.productsArray = [
        {"id": 1, "name": 'ROT-Pulser',  
                  "sname": "ROT-Pulser", 
                  "desc": "Rotary MWD + Gamma (175\xB0). Less Power Consumption, easy maintenance, works up to 175\xB0C and 20000 psi.",
                  "href": "Product/UPulser/image/slide9740_image035.png/markdown/pulser"
        },
        {"id": 2, "name": "MWD-EM", 
                  "sname": "MWD-EM", 
                  "desc": "EM MWD + Gamma (175\xB0), Good for Air/Mist/foaming Drilling, transmitting rate up to 12bps.",
                  "href": "Product/UEM/image/em.png/markdown/em"
        },
        {"id": 3, "name": "GOBT", 
                  "sname": "GOBT", 
                  "desc": "Near Bit Cont Inc & Focused  Gamma (175\xB0). Good for thin pay zone geosteering, wellpath smoothness and formation identification. Max transmitting distance up to 100 meters.",
                  "href": "Product/GOBT/image/slide9740_image037.png/markdown/gobt"
        },
        {"id": 4, "name": "DualTelemetry", 
                  "sname": "Dual", 

                  "desc": "(Pulse + EM) MWD + Gamma (175\xB0). Two way communication between surface and downhole. ",
                  "href": "Product/DualTelemetry/image/slide9740_image041.jpg/markdown/duo"

        },
         
   ];

    var url =  "http://www.uts-canada.com/docs/Near Bit Sub Data Sheet.pdf";
$scope.downloadInvoice = function () {
    // alert(" My Click function is called.");
   console.log("invoice");
    var url =  "http://www.uts-canada.com/docs/Near Bit Sub Data Sheet.pdf";

    $http.post(url,requestData, {responseType:'arraybuffer',headers:header })
            .success(function (response) {
                var file = new Blob([response], {type: 'application/pdf'});

                var isChrome = !!window.chrome && !!window.chrome.webstore;
                var isIE = /*@cc_on!@*/false || !!document.documentMode;
                var isEdge = !isIE && !!window.StyleMedia;


                if (isChrome){
                    var url = window.URL || window.webkitURL;

                    var downloadLink = angular.element('<a></a>');
                    downloadLink.attr('href',url.createObjectURL(file));
                    downloadLink.attr('target','_self');
                    downloadLink.attr('download', 'invoice.pdf');
                    downloadLink[0].click();
                }
                else if(isEdge || isIE){
                    window.navigator.msSaveOrOpenBlob(file,'invoice.pdf');

                }
                else {
                    var fileURL = URL.createObjectURL(file);
                    window.open(fileURL);
                }

            })
};

 
  $http.get('https://www.uts-canada.com/products.md').then(function(response) {
    $scope.p1 = response.data;
  });

});
