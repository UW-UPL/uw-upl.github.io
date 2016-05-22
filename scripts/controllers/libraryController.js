"use strict";

angular.module('upl-site').
controller('LibraryController', ['$scope', 'LibraryFactory', function($scope, Library) {
    $scope.books = [];

    Library.list().then(function(data) {
        $scope.books = data;
        var t = $("#library").DataTable();
        for (var i = 0; i < data.length; i++) {
            var book = data[i];
            t.row.add([
                book.title,
                book.authors,
                book.subject,
                book.year,
                book.lang,
                book.topics,
                book.num,
                book.isbn
            ]);
        }
        t.draw();
    }, function(err) {
        alert(err);
    });
}]);
