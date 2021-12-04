'use strict';

angular.module('helloApp')
 .service('SoftwareService', function($http) {
        this.getData = function(successHandler, failureHandler, item) {
            $http.get('https://www.uts-canada.com/' + item).then(function(response){
        successHandler(response);    //data can't be used outside this function
     }, function(response) {
        failureHandler(response);
     })

    };
   }) 


  .controller('SupportCtrl', ['$http', 'SoftwareService', '$scope', '$sce', 'AuthFactory', function ($http, SoftwareService, $scope, $sce, AuthFactory) {
    $scope.user = AuthFactory.getUser();
    this.releaseList= [
      'list item 1',
      'list item 2',
      'list item 3'
    ];

    function successHandler(res) {
        $scope.releaseList=res.data;
    }

    function failureHandler(res) {
        p = res;
        $scope.p = "error";
    }
    var md = "releases.json";
    SoftwareService.getData(successHandler, failureHandler, md);


  }]);
