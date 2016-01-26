"use strict";

angular.module('upl-site').
    controller('HomeController', ['$scope', 'EventsFactory', 'ProjectsFactory', function($scope, Events, Projects) {
        $scope.events = [];
        $scope.projects = [];

        Events.list().then(function(data) {
            $scope.events = data;
        }, function(data) {
            alert(data);
        });

        Projects.list().then(function(data) {
            $scope.projects = data;
        }, function(data) {
            alert(data);
        });
    }]);