'use strict';

angular.module('helloApp')
.controller('LoginCtrl', ['$scope', 'AuthFactory', function ($scope, AuthFactory) {
    $scope.message = "";
    $scope.person = AuthFactory.getUser();
    $scope.loginUser = function() {	

      var email = $scope.user.email; 
      var password = $scope.user.password;
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function(userCredential) {
          $scope.message = userCredential.email;
          AuthFactory.setUser(userCredential.email);  
          $scope.$apply();
          console.log("sign in success", userCredential.email);   
        })
      .catch(function(error) {
        AuthFactory.setUser(null);  
        $scope.message = error.message;
        $scope.LoginStatus = error.code + " " + error.message;
        $scope.$apply();
        console.error("Authentication failed:", error);
      });

    };
    
    $scope.logout = function() {

        firebase.auth().signOut().then(function(){
            var user = AuthFactory.getUser();
            if(user != null) {
                AuthFactory.setUser(null);  
                $scope.message = "sign out success: " + user;
                console.log("sign out success: " + user);
            }
            $scope.message = "sign out success";
            $scope.$apply();
          // Sign-out successful.
        }).catch(function(error){
          // An error happened.
          console.error("sign out failed:", error);
          $scope.message = error.message;
          $scope.$apply();
        });

    }

}]);
