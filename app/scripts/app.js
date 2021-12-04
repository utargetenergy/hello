'use strict';


angular.module('helloApp', [
    'firebase',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
  ])
.factory('_', ['$window', function($window) {
  return $window._; // assumes underscore has already been loaded on the page
}])
.factory('AuthFactory', function(){
        var user;

        return{
            getUser: function() { 
                var firebase_user = firebase.auth().currentUser;
                console.log("firebase_user" + firebase_user);
                var local_user = localStorage.getItem('auth.factory.user');
                if(local_user != null) {
                    user = local_user;
                }
                return user;
            },
            setUser : function(aUser){
                user = aUser;
            },
            isLoggedIn : function(){
                return(user)? user : false;
            }
        }
   })
.filter('markdown', function() {
    var converter = new showdown.Converter();
    return function (value) {
        converter.setOption("tables", true);
        return converter.makeHtml(value || ' ');
    };
})
.config(['$routeProvider', function ($routeProvider, $q, $location) {
    var site_prefix='/hello';
    //$locationProvider.html5Mode(true); //.hashPrefix("!");
   var firebaseConfig = {
  apiKey: "AIzaSyDprjgnrQNjHKNvzGEIEbFNZZDS2VPKOdc",
  authDomain: "uts-canada-4645b.firebaseapp.com",
  projectId: "uts-canada-4645b",
  storageBucket: "uts-canada-4645b.appspot.com",
  messagingSenderId: "213350442174",
  appId: "1:213350442174:web:953ad5f2b7b975216ceaef",
  measurementId: "G-951X91NY34"
};

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
     var auth  = firebase.auth();
    auth.onAuthStateChanged(function(user){

       if(user){
            console.log("user sign in:  " + user.email);
            localStorage.setItem('auth.factory.user', user.email);
            window.location.href = "#!/support";
        }
        else {
           localStorage.removeItem('auth.factory.user');
           console.log("no user is signin");
        }
    });


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

     .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      })

      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
   .when(site_prefix + '/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
    
      .when('/support', {
        templateUrl: 'views/support.html',
        controller: 'SupportCtrl',
        controllerAs: 'support'

       })
      .when(site_prefix + '/support', {
        templateUrl: 'views/support.html',
        controller: 'SuportCtrl',
        controllerAs: 'support'
      })
      .otherwise({
        redirectTo: '/'
      });

  }])

  .run(['$rootScope', '$location', 'AuthFactory', '_', function ($rootScope, $location, AuthFactory, _) {

    $rootScope._ = _;
    var routsRequireAuth = ['/support'];
    $rootScope.$on('$routeChangeStart', function (event) {
        var url = $location.url(); 
        var needAuth = _.contains(routsRequireAuth, url);
        console.log("require auth: " + needAuth);
        if (needAuth && !AuthFactory.isLoggedIn()) {
            console.log('DENY: ' + url);
            event.preventDefault();
            $location.path('/login');
        }
        else {
            console.log('ALLOW: ' + url);
        }
    });
    }])
  .factory('Page', function(){
         var title = 'default';
         return {
            title: function() { return title; },
            setTitle: function(newTitle) { title = newTitle; }
         };
   });

