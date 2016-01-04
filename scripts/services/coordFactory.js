"use strict";

angular.module('upl-site').
    factory('CoordFactory', ['$http', '$q', function($http, $q) {
        var deferred = $q.defer();

        var service = {};

        service.list = function() {
            return deferred.promise;
        };

        service.getCoord = function(id, list) {
            var i, l;
            for (i = 0, l = list.length; i < l; i++) {
                if (id === list[i].id) {
                    return list[i];
                }
            }
            return null;
        }

        service.populate = function() {
            $http.get('content/coords/coords.json').then(function(response) {
                // Success
                deferred.resolve(response.data);
            }, function(response) {
                // Error
                deferred.reject("Error loading coordinators");
            });
        };

        return service;
    }]);