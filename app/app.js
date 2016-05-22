/**
 * Created by millsky on 1/27/16.
 */
var fireAnt = angular.module('fireant', ['firebase','fireant.controllers','ui.router','fireant.data']);

fireAnt.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/login");

    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "components/login/login.html"
        })
        .state('team/:teamID', {
            url: "/team",
            templateUrl: "components/team/team.html"
        })
        .state('team/addTeam', {
            url: "/team/addTeam",
            templateUrl: "components/team/addTeam/addTeam.html"
        })
        .state('team/invite', {
            url: "/team/invite",
            templateUrl: "components/team/inviteTeam/inviteTeam.html"
        })
        .state('task/:taskID', {
            url: "/team",
            templateUrl: "components/tasks/tasks.html"
        })
        .state('home', {
            url: "/home",
            templateUrl: "components/home/home.html"
        })
});



