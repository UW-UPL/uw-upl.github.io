"use strict";

angular.module('upl-site').
    controller('LibraryController', ['$scope', 'LibraryFactory', function($scope, Library) {
        $scope.books = [];

        Library.list().then(function(data) {
            $scope.books = data;
        }, function(err) {
            alert(err);
        });
    }]);
