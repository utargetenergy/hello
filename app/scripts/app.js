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
  .config(function ($routeProvider, $locationProvider) {
    var site_prefix='/hello';

    $routeProvider
      .when('/Book/:bookId', {
        templateUrl: 'book.html',
        controller: 'BookCtrl',
        controllerAs: 'book'
      })
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
       .when('/products', {
        templateUrl: 'views/products.html',
        controller: 'ProductsCtrl',
        controllerAs: 'products'
      })
      .when('/hse', {
        templateUrl: 'views/hse.html',
        controller: 'HseCtrl',
        controllerAs: 'hse'
      })
       .when(site_prefix + '/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
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
    $locationProvider.html5Mode(true);
  });
