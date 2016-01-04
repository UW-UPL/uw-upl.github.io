"use strict";

angular.module('upl-site').
    controller('EventsController', ['$scope', 'EventsFactory', function($scope, events) {
        $scope.events = events.list();
    }]);