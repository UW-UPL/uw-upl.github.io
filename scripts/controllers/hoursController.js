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

        $scope.times = ["8:50AM", "9:55AM", "11:00AM", "12:05PM", "1:20PM", "2:25PM", "3:30PM", "4:35PM", "5:40PM"];



    }]).
    directive('stackColumns', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                $(element).stackColumns();
            }
        }
    });