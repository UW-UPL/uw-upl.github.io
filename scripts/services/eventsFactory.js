"use strict";



angular.module('upl-site')

    .factory('EventsFactory', ['$http', '$q', '$sce', function($http, $q, $sce) {

        var deferred = $q.defer();

        var service = {};



        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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


                    // allow html in descriptions

                    event.description = $sce.trustAsHtml(event.description);


                    event.timestamp = new Date(event.date);

                    event.dateString = "";

                    var day = event.timestamp.getDate();

                    var month = event.timestamp.getMonth();

                    var year = event.timestamp.getFullYear();

                    var hours = event.timestamp.getHours();

                    var ampm;

                    if (hours > 12) {

                        ampm = "PM";

                    } else {

                        ampm = "AM";

                    }

                    hours = hours % 12;

                    if (hours === 0) {
                        hours = 12;
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

