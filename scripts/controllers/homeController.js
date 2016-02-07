"use strict";

angular.module('upl-site').
    controller('HomeController', ['$scope', 'EventsFactory', 'ProjectsFactory', "LabFactory", function($scope, Events, Projects, Lab) {
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

        $scope.sliderSettings = {
            value : (30 + 150)/2,
            options : {
                floor : 30,
                ceil : 150,
                step : 1,
                onEnd : function (id, val, highVal) {
                    Lab.setCameraPosition(val);
                }
            }
        }
    }]);