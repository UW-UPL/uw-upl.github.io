"use strict";

angular.module('upl-site').
    controller('CoordsController', ['$scope', 'CoordFactory', function($scope, coords) {
        $scope.coords = coords.list();
    }]);