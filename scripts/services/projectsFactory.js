"use strict";

angular.module('upl-site').
    factory("ProjectsFactory", ['$http', '$q', function($http, $q) {
        var deferred = $q.defer();
        var service = {};
        var ghRepos = {};
        var SHOULD_PULL_GITHUB_DATA = true;

        service.list = function() {
            return deferred.promise;
        };

        service.getGitHubDataPromise = function (link) {
          if (ghRepos[link]) {
            return ghRepos[link].promise;
          } else {
            return null;
          }
        };

        service.populate = function() {
            $http.get('content/projects/projects.json').then(function(response) {
                deferred.resolve(response.data);
                if (SHOULD_PULL_GITHUB_DATA) {
                  populateGitHubData(response.data);
                }
            }, function(response) {
                deferred.reject("Error loading projects");
            });
        };

        var populateGitHubData = function(data) {
          // first build up the map of link => promise
          data.forEach(function(project) {
            var link = project.link;
            if (link && link.includes('github.com')) {
              ghRepos[link] = $q.defer();
            } else {
              /* DO NOTHING -- if we wanted to allow non-GitHub repos
               * to use the sorting ability, we could allow users to enter
               * in the JS timestamp in the projects JSON themselves.
               * The code directly below "should" be correct for that purpose, but the
               * for loop below would need to be modified to handle
               * non-GitHub repos.
              // if a timestamp was supplied in the JSON
              if (data.latestCommitTimestamp) {
                // a promise with an immediately fulfilled value
                ghRepos[link] = $q(data.latestCommitTimestamp);
              } else {
                // do nothing
              }
              */
            }
          });

          var baseURL = 'https://api.github.com/';

          // then execute the requests for the promises
          for (var link in ghRepos) {
            var parse = parseOwnerAndRepoFromLink(link);

            // default to always fetching the master branch
            var getURL = baseURL + 'repos/' + parse.owner
              + '/' + parse.repo + '/branches/master';

            $http.get(getURL).then(
                successGitHubResponseHandler(link),
                failureGitHubResponseHandler(link)
            );
          }
        };

        // need to return a closure because iteration over keys is dumb & slow
        var successGitHubResponseHandler = function (repoLink) {
          return function (response) {
            var headCommit      = response.data.commit.commit.committer;
            // convert the date string to a date object
            var headCommitDate  = new Date(headCommit.date);

            // use the timestamp instead of the date object
            ghRepos[repoLink].resolve(headCommitDate.getTime());
          };
        };

        var failureGitHubResponseHandler = function (repoLink) {
          return function (response) {
            // TODO: test this failure case!
            // TODO: this will happen if the rate limit is hit!
            // XXX: maybe don't fetch the latest commit if the field is already valid...
            // rate limit <-> reponse.status === 403
            console.log('FAILURE!', response);
            ghRepos[repoLink].reject('Error loading GitHub information');
          };
        };

        var parseOwnerAndRepoFromLink = function(link) {
          // I'm not saying this regex is 100% robust,
          // but it should cover most cases, feel free to update
          var regex = /github\.com\/([\w-]+)\/([\w-]+)/;

          var matches = link.match(regex);

          if (!matches) {
            return null;
          } else {
            return {
              owner:  matches[1],
              repo:   matches[2]
            };
          }
        };

        return service;
    }])
