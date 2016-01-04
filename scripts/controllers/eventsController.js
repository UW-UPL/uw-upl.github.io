"use strict";

angular.module('upl-site').
    controller('EventsController', ['$scope', 'EventsFactory', function($scope, Events) {
        $scope.events = [];

        Events.list().then(function(data) {
            $scope.events = data;
        }, function(data) {
            alert(data);
        });
    }]);