"use strict";

angular.module('upl-site').
    controller('HomeController', ['$scope', 'EventsFactory', 'ProjectsFactory', "LabFactory", '$filter',
      function($scope, Events, Projects, Lab, $filter) {
        $scope.events = [];
        $scope.pairedProjects = [];
        $scope.rawProjects = []; // TODO: try to go to just `projects`

        /* Events */
        Events.list().then(function(data) {
            $scope.events = data.Upcoming.slice(0, 3);
        }, function(data) {
            alert(data);
        });

        /* Projects */
        Projects.list().then(function(data) {

            var successHandler = function(project) {
              return function(latestCommitTimestamp) {
                console.log(`title: ${ project.title }, ts: ${ latestCommitTimestamp }`);
                project.latestCommitTimestamp = latestCommitTimestamp;
              };
            };

            var failureHandler = function(project) {
              return function() {
                console.log('fetch failure');
                project.latestCommitTimestamp = 0;
              };
            };

            // first get all the GitHub data
            for (var projectInd in data) {
              var project = data[projectInd];
              var ghPromise = Projects.getGitHubDataPromise(project.link);

              if (ghPromise) {
                ghPromise.then(successHandler(project), failureHandler(project));
              } else {
                project.latestCommitTimestamp = 0;
              }
            }

            // TODO: update the sorting order on promise completion
            $scope.rawProjects = data;
        }, function(data) {
            alert(data);
        });

        var sortProjects = function(projects) {
          var orderingExpr = ['-latestCommitTimestamp', '+title'];
          return $filter('orderBy')(projects, orderingExpr);
        };

        var chunkArray = function(array, chunkSize) {
          var chunk = function(n) {
            return function(acc, project, projectInd, arr) {
              if (projectInd % n === 0) {
                var newChunk = arr.slice(projectInd, projectInd + n);
                return acc.concat([newChunk]);
              } else {
                return acc;
              }
            };
          };

          return array.reduce(chunk(chunkSize), []);
        };

        var sortAndChunk = function(projects) {
          return chunkArray(sortProjects(projects), 2);
        };

        // TODO: this does not seem to work as intended
        // maybe call some `pairedProject` updater function in the promise callback
        $scope.$watch('rawProjects', function() {
          $scope.pairedProjects = sortAndChunk($scope.rawProjects);
        });

        /* Webcam stuff */
        var moveCamera = function(id, val, highVal) {
            Lab.setCameraPosition(val);
        };

        $scope.sliderSettings = {
            value : (30 + 150)/2,
            options : {
                floor : 30,
                ceil : 150,
                step : 1,
                onChange : moveCamera,
                onInput : moveCamera
            }
        };
    }]);
