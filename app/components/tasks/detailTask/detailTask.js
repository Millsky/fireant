/**
 * Created by millsky on 2/3/16.
 */
angular.module('fireant.controllers').controller('detailTask',detailTaskController);

detailTaskController.$inject(['$scope','$firebaseObject','persist']);

function detailTaskController($scope,$firebaseObject,persist) {

    var ref = new Firebase("https://fireants.firebaseio.com"),
        authData = ref.getAuth();

    $scope.task = {};

    var setTaskDetail = function (id) {
        console.log("GOT ID:" + id);
        var task = ref.child('teams').child(persist.get('currentTeam')).child('tasks').child(id);
        $scope.task = $firebaseObject(task);
        console.log($scope.task);
    };

    persist.listen('task', function () {
        console.log("SOMETHING CHANGED");
        setTaskDetail(persist.get('task'));
    });

    persist.listen('currentTeam', function () {
        setTaskDetail(persist.get('task'));
    });
}