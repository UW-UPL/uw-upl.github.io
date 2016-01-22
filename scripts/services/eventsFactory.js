"use strict";

angular.module('upl-site').
    factory('EventsFactory', ['$http', '$q', '$sce', function($http, $q, $sce) {
        var deferred = $q.defer();
        var service = {};

        service.list = function() {
            return deferred.promise;
        };


        service.populate = function() {
            $http.get('content/events/events.json').then(function(response) {
                // Success
                var events = response.data;
                events.forEach(function(event) {
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

                    // allow html in descriptions
                    event.description = $sce.trustAsHtml(event.description);
                });
                
                deferred.resolve(events);
            }, function(response) {
                // Error
                deferred.reject("Error loading events");
            });
        };

        return service;
    }]);
