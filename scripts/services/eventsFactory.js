"use strict";

angular.module('upl-site').
    factory('EventsFactory', ['$http', function($http) {
        var events = [];

        var service = {};

        service.list = function() {
            return events;
        };

        service.populate = function() {
            $http.get('content/events/events.json').then(function(response) {
                // Success
                events = response.data;
                events.forEach(function(event) {
                    event.timestamp = new Date(event.date);
                });
            }, function(response) {
                // Error
                events = [];
            });
        };

        return service;
    }]);