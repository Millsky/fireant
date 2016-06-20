/**
 * Created by millsky on 1/27/16.
 */
angular.module('fireant.controllers').controller('team',teamController);

teamController.$inject(['$scope','$firebaseObject','$firebaseArray','persist']);

function teamController($scope,$firebaseObject,$firebaseArray,persist){
    /* from the team screen the user should be able to look at the tasks and assign tasks see team members */
    var ref = new Firebase("https://fireants.firebaseio.com"),
        authData = ref.getAuth(),
        userTeams = ref.child('users').child(authData.uid).child('teams'),
        teams = ref.child('teams');

    $scope.boolShowAddTeam = false;
    $scope.myTeams = $firebaseArray(userTeams);
    $scope.globalTeams = $firebaseArray(teams);
    $scope.teamName = "";

    $scope.showAddTeam = function(){
        $scope.boolShowAddTeam = true;
    }

    $scope.addTeam = function (){
        var teamObj = {name:$scope.teamName};
        $scope.globalTeams.$add(teamObj).then(function (ref) {
            var id = ref.key();

            teamObj.teamID = id;
            teamObj.users = [{userID:authData.uid}];

            $scope.myTeams.$add(teamObj).then(function (s) {
                $scope.teamName = "";
            });
        });

    }

    $scope.showTeamTasks = function(id){
        persist.set('currentTeam',id);
    }

};