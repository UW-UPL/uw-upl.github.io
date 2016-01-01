'use strict';

angular.module('upl-site')
    .controller('NavigationController', ['$scope', '$location', 
        function($scope, $location) {
            // $routeChangeSuccess is an event that is fired,
            // when the app has switched from one route to another.
            // http://docs.angularjs.org/api/ngRoute.$route
            // here we subscribe to that event. 
            $scope.$on('$routeChangeSuccess',
                function() {
                    $scope.locationPath = $location.path();
                    console.log('locationPath: ' + $location.path() );
                }
            );
        }
    ]);