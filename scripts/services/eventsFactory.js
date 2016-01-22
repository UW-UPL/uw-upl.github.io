"use strict";

angular.module('upl-site').
    factory('EventsFactory', ['$http', '$q', function($http, $q) {
        var deferred = $q.defer();
        var service = {};

        var months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        var now = Date.now();
        
        service.list = function() {
            return deferred.promise;
        };


        service.populate = function() {
            $http.get('content/events/events.json').then(function(response) {
                // Success
                var events = {'Upcoming': [], 'Previous': []};
                response.data.forEach(function(event) {
                    event.timestamp = new Date(event.date);
                    event.dateString = "";
                    var day = event.timestamp.getDate();
                    var month = event.timestamp.getMonth() + 1;
                    var year = event.timestamp.getFullYear();
                    var hours = event.timestamp.getHours();
                    var ampm;
                    if (hours > 12) {
                        hours -= 12;
                        ampm = "PM";
                    } else if (hours === 0) {
                        hours = 12;
                        ampm =  "AM";
                    } else {
                        ampm = "AM";
                    }
                    var mins = event.timestamp.getMinutes();
                    if (mins < 10) {
                        mins = "0" + mins;
                    }
                    event.dateString = days[event.timestamp.getDay()] + ', ' + months[month] + ' ' + day + ', ' + year + ' at ' + hours + ':' + mins + ' ' + ampm;
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
