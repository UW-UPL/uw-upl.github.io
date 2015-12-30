'use strict';

/* see http://www.jshint.com/docs/ if you want to know what this is: */
/* global Pages */

// Where do all these partials live?
var TemplatePrefix = 'views/';

// Create Angular application module.
// Declare ngRoute as a dependency. http://docs.angularjs.org/api/ngRoute
// Then configure the $routeProvider by defining the routes.

angular.module('upl-site', ['ngRoute'])

    .config(function ($routeProvider) {
        // register the routes and the templates
        // http://docs.angularjs.org/api/ngRoute.$routeProvider

        $routeProvider.
            when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            }).
            when('/events', {
                templateUrl: 'views/events.html',
                controller: 'EventsController'
            }).
            when('/projects', {
                templateUrl: 'views/projects.html',
                controller: 'ProjectsController'
            }).
            when('/coords', {
                templateUrl: 'views/coords.html',
                controller: 'CoordsController'
            }).
            when('/hours', {
                templateUrl: 'views/hours.html',
                controller: 'HoursController'
            }).
            when('/about', {
                templateUrl: 'views/about.html',
            }).
            otherwise({
                redirectTo: '/'
            });
    })
;