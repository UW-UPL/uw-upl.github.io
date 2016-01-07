"use strict";

angular.module('upl-site').
    controller('HoursController', ['$scope', 'HoursFactory', 'CoordFactory', function($scope, Hours, Coords) {
        $scope.coords = [];
        $scope.hours = null;

        Coords.list().then(function(data) {
            $scope.coords = data;
        }, function(data) {
            alert(data);
        });

        Hours.list().then(function(data) {
            $scope.hours = data;
        }, function(data) {
            alert(data);
        });
    }]);