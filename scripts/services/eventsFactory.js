"use strict";

angular.module('upl-site').
    factory('EventsFactory', ['$http', '$q', function($http, $q) {
        var deferred = $q.defer();
        var service = {};

        var months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var re = /(\d{1,2})\/(\d{1,2})\/(\d{2,4}) (\d{1,2}):(\d{2}) ([AP]M)/;
        
        service.list = function() {
            return deferred.promise;
        };


        service.populate = function() {
            $http.get('content/events/events.json').then(function(response) {
                // Success
                var events = {'Upcoming': [], 'Previous': []};
                response.data.forEach(function(event) {
                    var matches = event.date.match(re);
                    var month = matches[1];
                    var day = matches[2];
                    var year = matches[3];
                    var hours = matches[4];
                    var mins = matches[5];
                    var ampm = matches[6];
                    event.timestamp = new Date(year, month-1, day, hours, mins);
                    event.dateString = days[event.timestamp.getDay()] + ', ' + months[month] + ' ' + day + ', ' + year + ' at ' + hours + ':' + mins + ' ' + ampm;
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
