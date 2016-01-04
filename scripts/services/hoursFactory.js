"use strict";

angular.module('upl-site').
    factory('HoursFactory', ['$http', '$q', function($http, $q) {
        var deferred = $q.defer();
        var service = {};

        service.list = function() {
            return deferred.promise;
        };

        service.populate = function() {
            $http.get('content/hours/hours.json').then(function(response) {
                deferred.resolve(response.data);
            }, function(response) {
                deferred.reject("Error loading hours");
            });
        }

        return service;
    }]);