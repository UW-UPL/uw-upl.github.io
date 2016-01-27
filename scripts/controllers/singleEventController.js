"use strict";

angular.module('upl-site').
    controller('SingleEventController', ['$scope', 'EventsFactory', '$routeParams', function($scope, Events, $routeParams) {
        $scope.event = null;

        Events.list().then(function(data) {
          var allEvents = data.Previous.concat(data.Upcoming);

          for (var someEventIndex in allEvents) {
            var someEvent = allEvents[someEventIndex];

            if (someEvent.link === $routeParams.event) {
              $scope.event = someEvent;
              break;
            }
          }
        }, function(data) { alert(data); });
    }]);
