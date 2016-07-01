"use strict";

angular.module('upl-site').
    controller('HomeController', ['$scope', 'EventsFactory', 'ProjectsFactory', "LabFactory", function($scope, Events, Projects, Lab) {
        $scope.events = [];
        $scope.projects = [];

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
                /*
                ghPromise.then(function(latestCommitTimestamp) {
                  console.log(`title: ${ project.title }, ts: ${ latestCommitTimestamp }`);
                  project.latestCommitTimestamp = latestCommitTimestamp;
                });
                */
                ghPromise.then(successHandler(project), failureHandler(project));
              } else {
                project.latestCommitTimestamp = 0;
              }
            }

            // TODO: this should be done in the view
            data.sort(function(a, b) {
                // TODO: github sort here (but in view!!!)
                return a.title.toLocaleLowerCase()
                    .localeCompare(b.title.toLocaleLowerCase());
            });
            // TODO: the Left/Right split should be accomplished through CSS
            var left = true;
            var row = 0;
            for (var i = 0; i < data.length; i++) {
                var d = data[i];
                if (d.description.length > 100) {
                    d.description = d.description.substring(0, 100) + "...";
                }
                // TODO: shouldn't `left` be `i % 2 == 0` and `row` be `Math.floor(i/2)`?
                if (left) {
                    $scope.projects.push([d]);
                    left = false;
                } else {
                    $scope.projects[row].push(d);
                    left = true;
                    row++;
                }
            }
        }, function(data) {
            alert(data);
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
