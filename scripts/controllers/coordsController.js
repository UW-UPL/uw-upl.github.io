"use strict";

angular.module('upl-site').
    controller('CoordsController', ['$scope', 'CoordFactory', function($scope, Coords) {
        $scope.coords = [];

        Coords.list().then(function(data) {
            $scope.coords = data;
        }, function(data) {
            alert(data);
        });
    }]);