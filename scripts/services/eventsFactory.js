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
                var events = response.data;
                events.forEach(function(event) {
                    event.timestamp = new Date(event.date);
                });
                deferred.resolve(events);
            }, function(response) {
                // Error
                deferred.reject("Error loading events");
            });
        };

        return service;
    }]);