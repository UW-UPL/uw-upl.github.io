"use strict";

angular.module('upl-site').
    controller('ProjectsController', ['$scope', 'ProjectsFactory', function($scope, Projects) {
        $scope.projects = [];

        Projects.list().then(function(data) {
            $scope.projects = data;
        }, function(data) {
            alert(data);
        });
    }]);
