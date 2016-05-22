/**
 * Created by millsky on 1/27/16.
 */
var fireAntControllers = angular.module('fireant.controllers');

var home = fireAntControllers.controller('home',['$scope','$firebaseArray',function($scope,$firebaseArray){
    /* from the home screen the user should be be able to add a team look at teams in their queue       */

    /* TASKS ASSIGNED TO MEMBERS */
    /* TEAM => USERS => TASKS (CAN BE ASSIGNED TO MULTIPLE TEAMS AND USERS) / USERS / TASKS   */
    var schema = {
        tasks: {
            taskID:"",
            taskStatus:"",
            userCreated:"",
            userAssigned:"",
            dateAssigned:"",
            dateCompleted:""
        },
        teams: {
            name: "",
            members: [
                {
                    userID:""
                }
            ],


        },
        users: {
            email:"",
            name: "",

        },
    }

}]);