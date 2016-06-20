/**
 * Created by millsky on 1/27/16.
 */
angular.module('fireant.controllers').controller('tasks',tasksController);

tasksController.$inject(['$scope','$firebaseObject','$firebaseArray','persist']);

function tasksController($scope,$firebaseObject,$firebaseArray,persist){
    /* A list of tasks */
    var ref = new Firebase("https://fireants.firebaseio.com"),
        authData = ref.getAuth();

    var setTasks = function (id) {
        if(id) {
            var teamTasks = ref.child('teams').child(id).child('tasks'),
                team = ref.child('teams').child(id),
                userTasks = ref.child('users').child(authData.uid).child('tasks');

            $scope.tasks = $firebaseArray(teamTasks);
            $scope.team = $firebaseObject(team);
            $scope.myTasks = $firebaseArray(userTasks);
        }
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
    };

    $scope.taskDetail = function (id) {
        persist.set('task',id);
    };

    persist.listen('currentTeam', function () {
        setTasks(persist.get('currentTeam'));
    });

};