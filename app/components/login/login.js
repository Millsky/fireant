/**
 * Created by millsky on 1/27/16.
 */
var login = fireAnt.controller('login',['$scope','$state','$firebaseAuth',function($scope,$state,$firebaseAuth){
    var ref = new Firebase("https://fireants.firebaseio.com/");
    var auth = $firebaseAuth(ref);

    $scope.boolNewUser = false;
    $scope.password = "";
    $scope.passwordRepeat = "";
    $scope.email = "";

    $scope.loginFacebook = function () {
        auth.$authWithOAuthPopup("facebook").then(function (user) {
            var usersRef = ref.child('users');
            usersRef.child(user.uid).once('value', function (snapshot) {
                if (snapshot.val() == null) {
                    user.teams = [];
                    user.tasks = [];
                    usersRef.child(user.uid).set(user);
                    $state.go('home');
                } else {
                    //ACCOUNT ALREADY EXISTS
                    $state.go('home');
                }
            });
        }).catch(function (error) {
            console.log("Authentication failed:", error);
        });
    }
    $scope.loginPassword = function () {
        ref.authWithPassword({
            "email": $scope.email,
            "password": $scope.password
        }, function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                $state.go('home');
            }
        });
    }
    $scope.createUser    = function () {
        $scope.boolNewUser = true;
    }

    $scope.addUser = function () {
        ref.createUser({
            email    : $scope.email,
            password : $scope.password
        }, function(error, user) {
            if (error) {
                console.log("Error creating user:", error);
            } else {
                console.log("Successfully created user account with uid:", user.uid);
                var usersRef = ref.child('users');
                usersRef.child(user.uid).once('value', function (snapshot) {
                    if (snapshot.val() == null) {
                        user.teams = [];
                        user.tasks = [];
                        usersRef.child(user.uid).set(user);
                        $state.go('home');
                    }
                });
            }
        });
    }
}]);