"use strict";

angular.module('upl-site').
controller('LibraryController', ['$scope', 'LibraryFactory', function($scope, Library) {
    $scope.books = [];

    Library.list().then(function(data) {
        $scope.books = data;
        var t = $("#library").DataTable();
        for (var i = 0; i < data.length; i++) {
            t.row.add(data[i]);
        }
        t.draw();
    }, function(err) {
        alert(err);
    });
}]);
