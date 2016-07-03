"use strict";

angular.module('upl-site').
    controller('HomeController', ['$scope', '$filter', 'EventsFactory', 'ProjectsFactory', "LabFactory",
      function($scope, $filter, Events, Projects, Lab) {
        $scope.events = [];
        $scope.pairedProjects = [];
        var rawProjects = [];

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
                project.latestCommitTimestamp = latestCommitTimestamp;
              };
            };

            var failureHandler = function(project) {
              return function() {
                project.latestCommitTimestamp = 0;
              };
            };

            rawProjects = data;

            // first get all the GitHub data
            for (var projectInd in rawProjects) {
              var project = data[projectInd];
              var ghPromise = Projects.getGitHubDataPromise(project.link);

              if (ghPromise) {
                ghPromise
                  .then(successHandler(project), failureHandler(project))
                  .finally(function() {
                    // regardless of success or failure,
                    // update the pairedProjects list
                    $scope.pairedProjects = sortAndChunk(rawProjects);
                  });
              } else {
                project.latestCommitTimestamp = 0;
              }
            }

            $scope.pairedProjects = sortAndChunk(rawProjects);
        }, function(data) {
            alert(data);
        });

        var sortProjects = function(projects) {
          // order by timestamp decreasing (latest first)
          // then alpha increasing (A -> Z);
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
