"use strict";

angular.module('upl-site').
    factory("LabFactory", ['$http', '$q', function($http, $q) {
        var deferred = $q.defer();
        var service = {};

        service.status = function() {
            return deferred.promise;
        };

        service.populate = function() {
            $http.get('http://eris.upl.cs.wisc.edu:1312/status').then(function(response) {
                deferred.resolve(response.data);
            }, function(response) {
                deferred.reject("Unable To Retreive Lab Status.");
            });
        };

        return service;
    }])