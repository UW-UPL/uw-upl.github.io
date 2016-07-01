"use strict";

angular.module('upl-site').
    factory("ProjectsFactory", ['$http', '$q', function($http, $q) {
        var deferred = $q.defer();
        var service = {};
        var ghRepos = {};

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
                // XXX: maybe zip in the latest commit date with the project objects?
                console.log('POPULATING...'); // only repopulates on refresh (duh)
                populateGitHubData(response.data);
            }, function(response) {
                deferred.reject("Error loading projects");
            });
        };

        // TODO: only fetch if the field isn't present
        var populateGitHubData = function(data) {
          // first build up the map of link => promise
          data.forEach(function(project) {
            var link = project.link;
            if (link && link.includes('github.com')) {
              ghRepos[link] = $q.defer();
            } else {
              // do nothing
            }
          });

          var baseURL = 'https://api.github.com/';

          // then execute the requests for the promises
          for (var link in ghRepos) {
            console.log(`link is ${link}`);
            var parse = parseOwnerAndRepoFromLink(link);

            // default to always fetching the master branch
            var getURL = baseURL + 'repos/' + parse.owner
              + '/' + parse.repo + '/branches/master';

            /*
            $http.get(getURL).then(function(response) {
              var headCommit      = response.data.commit.commit.committer;
              var headCommitDate  = new Date(headCommit.date);

              console.log(link, headCommitDate);

              // use the timestamp instead of the date object
              ghRepos[link].resolve(headCommitDate.getTime());
            }, function(response) {
              // TODO: test this failure case!
              ghRepos[link].reject('Error loading GitHub information');
            });
            */

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
            var headCommitDate  = new Date(headCommit.date);

            console.log(repoLink, headCommitDate);

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
