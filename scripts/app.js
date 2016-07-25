'use strict';

/* see http://www.jshint.com/docs/ if you want to know what this is: */
/* global Pages */

// Where do all these partials live?
var TemplatePrefix = 'views/';

// Create Angular application module.
// Declare ngRoute as a dependency. http://docs.angularjs.org/api/ngRoute
// Then configure the $routeProvider by defining the routes.

angular.module('upl-site', ['ngRoute', "rzModule"]).

    config(function ($routeProvider) {
        // register the routes and the templates
        // http://docs.angularjs.org/api/ngRoute.$routeProvider

        $routeProvider.
            when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            }).
            when('/events/:event', {
                templateUrl: 'views/single-event.html',
                controller: 'SingleEventController'
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
                controller: 'AboutController'
            }).
            when('/lab', {
                templateUrl: 'views/lab.html',
                controller: 'LabController'
            }).
            otherwise({
                redirectTo: '/'
            });
    }).
    run(function() {
      // augment the Date object with some useful functions
      // using the code from:
      // http://stackoverflow.com/questions/11887934/check-if-daylight-saving-time-is-in-effect-and-if-it-is-for-how-many-hours
      Date.prototype.standardTimezoneOffset = function() {
        const jan = new Date(this.getFullYear(), 0, 1);
        const jul = new Date(this.getFullYear(), 6, 1);
        return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
      };

      Date.prototype.isDST = function() {
        return this.getTimezoneOffset() < this.standardTimezoneOffset();
      };
    }).
    run(['CoordFactory', 'EventsFactory', 'HoursFactory', 'ProjectsFactory', 'LabFactory', function(Coords, Events, Hours, Projects, Lab) {
        Coords.populate();
        Events.populate();
        Hours.populate();
        Projects.populate();
        Lab.populate();
    }]);
