"use strict";

angular.module('upl-site').
    factory('EventsFactory', ['$http', '$q', function($http, $q) {
        var deferred = $q.defer();
        var service = {};

        service.list = function() {
            return deferred.promise;
        };


        service.populate = function() {
            $http.get('content/events/events.json').then(function(response) {
                // Success
                var events = {'Upcoming': [], 'Previous': []};
                response.data.forEach(function(event) {
                    event.timestamp = new Date(event.date);
                    var hours, mins, ampm;
                    hours = event.timestamp.getHours();
                    mins = event.timestamp.getMinutes();

                    if (hours < 12) {
                        ampm = "AM";
                    } else {
                        ampm = "PM";
                    }

                    hours = hours % 12;
                    if (hours === 0) {
                        hours = 12;
                    }

                    if (mins < 10) {
                        mins = '0' + mins;
                    }

                    event.timeOfDay = hours + ':' + mins + ' ' + ampm;

                    var now = Date.now();
                    if (event.timestamp >= now) {
                        events['Upcoming'].push(event);
                    } else {
                        events['Previous'].push(event);
                    }
                });

                // Sort upcoming events in chronological order and
                // previous events in reverse-chronological order
                events['Upcoming'].sort(function(a, b) {
                    return a.timestamp - b.timestamp;
                });
                events['Previous'].sort(function(a, b) {
                    return b.timestamp - a.timestamp;
                });
                deferred.resolve(events);
            }, function(response) {
                // Error
                deferred.reject("Error loading events");
            });
        };

        return service;
    }]);
