"use strict";

angular.module('upl-site').
    factory('CoordFactory', ['$http', function($http) {
        var coords = [];

        var service = {};

        service.list = function() {
            return coords;
        };

        service.getCoord = function(id) {
            for (var i = 0, l = coords.length; i < l; i++) {
                var coord = coords[i];
                if (coord.id === id) {
                    return coord;
                }
            }
            return null;
        };

        service.populate = function() {
            $http.get('content/coords/coords.json').then(function(response) {
                // Success
                coords = response.data;
            }, function(response) {
                // Error
                coords = [];
            });
        };

        return service;
    }]);