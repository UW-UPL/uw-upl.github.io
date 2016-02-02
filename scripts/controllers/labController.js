"use strict";

angular.module('upl-site').
    controller('LabController', ['$scope', 'LabFactory', function($scope, Lab) {
        $scope.status = {};

        Lab.status().then(function(data) {
            $scope.status = data;
        }, function(data) {
        	console.log(data);
           // alert(data);
        });
    }]);