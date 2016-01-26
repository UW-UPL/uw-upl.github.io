"use strict";

angular.module('upl-site').
    controller('SingleEventController', ['$scope', 'EventsFactory', '$routeParams', '$location', function($scope, Events, $routeParams, $location) {
        $scope.event = null;

        // expecting something like `.../events/my_cool_talk-<timestamp>`
        var split = $routeParams.event.split('-');

        var eventNameSnakeCase = split[0]; // e.g. My Cool Talk <=> my_cool_talk
        var eventTimestamp = parseInt(split[1], 10);

        Events.list().then(function(data) {
          var allEvents = data.Previous.concat(data.Upcoming);

          for (var someEventIndex in allEvents) {
            var someEvent = allEvents[someEventIndex];

            var someEventNameSC = someEvent.title.toLowerCase().replace(/[\s-]/g, '_');
            var someEventTimestamp = someEvent.timestamp.getTime();

            if (eventNameSnakeCase === someEventNameSC
                && eventTimestamp === someEventTimestamp) {

              $scope.event = someEvent;

              break;
            }
          }

          // if the event isn't found, redirect to `/events` index
          if (!$scope.event) {
            $location.url('events');
          }

        }, function(data) {
            alert(data);
        });
    }]);
