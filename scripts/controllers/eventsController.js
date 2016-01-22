"use strict";

angular.module('upl-site').
    controller('EventsController', ['$scope', 'EventsFactory', function($scope, Events) {
        $scope.events = [];

        Events.list().then(function(data) {
            $scope.events = data;
        }, function(data) {
            alert(data);
        });

        $scope.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        $scope.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    }]);