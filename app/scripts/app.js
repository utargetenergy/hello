'use strict';

angular.module('helloApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
.filter('markdown', function() {
    var converter = new showdown.Converter();
    return function (value) {
        converter.setOption("tables", true);
        return converter.makeHtml(value || ' ');
    };
})
  .config(['$routeProvider',  function ($routeProvider, $routeParams) {
    var site_prefix='/hello';
    //$locationProvider.html5Mode(true); //.hashPrefix("!");

    $routeProvider
    .when('/params/:id', {
        template: '<h1>Param: {{ paramValue }}</h1>',
        controller: 'ParamsCtrl'
      })
      .when('/Product/:productId/image/:imageId/markdown/:markdownId', {
        templateUrl: 'views/product.html',
        controller: 'ProductCtrl',
        controllerAs: 'product'
      })
       .when('/Book/:bookId', {
        templateUrl: 'book.html',
        controller: 'BookCtrl',
        controllerAs: 'book'
      })

      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'HomeCtrl',
        controllerAs: 'main',
        resolve: {
           delay: function($q, $timeout){
                var delay = $q.defer();
                $timeout(delay.resolve, 1000);
                return delay.promise;
           }
        }  
      }) 
       .when('/products', {
        templateUrl: 'views/products.html',
        controller: 'ProductsCtrl',
        controllerAs: 'products',
        reloadOnSearch: false,
      })
       .when('/services', {
        templateUrl: 'views/services.html',
        controller: 'ServicesCtrl',
        controllerAs: 'services'
      })
      .when('/hse', {
        templateUrl: 'views/hse.html',
        controller: 'HseCtrl',
        controllerAs: 'hse'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        controllerAs: 'contact'
      })
        .when(site_prefix + '/', {
        templateUrl: 'views/main.html',
        controller: 'HomeCtrl',
        controllerAs: 'main'
      })
       .when(site_prefix + '/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/todo', {
        templateUrl: 'views/todo.html',
        controller: 'TodoCtrl',
        controllerAs: 'todo'
      })
      .when(site_prefix + '/todo', {
        templateUrl: 'views/todo.html',
        controller: 'TodoCtrl',
        controllerAs: 'todo'
      })
      .otherwise({
        redirectTo: '/'
      });

  }])
  .factory('Page', function(){
         var title = 'default';
         return {
            title: function() { return title; },
            setTitle: function(newTitle) { title = newTitle; }
         };
   });
/*
function MainCtrl($scope, Page) {
  $scope.Page = Page;
}
function Test1Ctrl($scope, Page) {
  Page.setTitle('title1');
}
function Test2Ctrl($scope, Page) {
  Page.setTitle('title2');
}
*/
