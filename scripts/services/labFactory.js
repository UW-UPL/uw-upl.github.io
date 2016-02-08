"use strict";

angular.module('upl-site').
    factory("LabFactory", ['$http', '$q', function($http, $q) {
        var deferred = $q.defer();
        var service = {};

        service.status = function() {
            return deferred.promise;
        };

        service.populate = function() {
            $http.get('http://eris.upl.cs.wisc.edu:1312/lab-status').then(function(response) {
                deferred.resolve(response.data);
                console.log(response.data)
            }, function(response) {
                deferred.reject("Unable To Retreive Lab Status.");
            });
        };

        service.setCameraPosition = function (pos) {
            $http.get('http://eris.upl.cs.wisc.edu:1312/pos/' + (150-pos) );
        }

        return service;
    }])