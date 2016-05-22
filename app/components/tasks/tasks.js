/**
 * Created by millsky on 1/27/16.
 */
var fireAntControllers = angular.module('fireant.controllers');

var tasks = fireAntControllers.controller('tasks',['$scope','$firebaseObject','$firebaseArray','persist',function($scope,$firebaseObject,$firebaseArray,persist){
    /* A list of tasks */
    var ref = new Firebase("https://fireants.firebaseio.com");
    var authData = ref.getAuth();

    var setTasks = function (id) {
        console.log(id);
        var teamTasks = ref.child('teams').child(id).child('tasks');
        var team = ref.child('teams').child(id);
        var userTasks = ref.child('users').child(authData.uid).child('tasks')
        $scope.tasks = $firebaseArray(teamTasks);
        $scope.team =  $firebaseObject(team);
        $scope.myTasks = $firebaseArray(userTasks);
    }

    $scope.taskName = "";

    $scope.showAddTask = function(){
        /* STATUS: 0 == STARTED, 2 == ASSIGNED IN PROGRESS, 3 == DONE */
        var taskObj = {
            name: $scope.taskName,
            user_id: authData,
            description: '',
            status: 0,
            assignedTo: authData.uid,
            date: Date.now()
        }
        $scope.tasks.$add(taskObj).then(function (ref) {
            var id = ref.key();
            var myTask = {id:id};
            $scope.myTasks.$add(myTask);
        });
        $scope.taskName = '';
    }

    $scope.taskDetail = function (id) {
        persist.set('task',id);
    }

    persist.listen('currentTeam', function () {
        setTasks(persist.get('currentTeam'));
    });

}]);
