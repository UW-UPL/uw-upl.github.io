"use strict";

angular.module('upl-site').
    controller('EventsController', ['$scope', 'EventsFactory', function($scope, events) {
        $scope.events = [];
        
        events.list().then(function(data) {
            $scope.events = data;
        }, function(data) {
            alert(data);
        });
    }]);