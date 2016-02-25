'use strict';
// This directive can be used as an element, attribute, or class
// Recommended to use it as an attribute so then it is element independent
angular.module('upl-site')
.directive('currentCoord', ['HoursFactory', '$interval',
  function(Hours, $interval) {
    return function(scope, elem, attrs) {

      $(elem).addClass('current-coord'); // for styling

      var stopTime  = null;
      var INTERVAL_TIME = 1000 * 60 * 5; // five minutes

      scope.coordDataPayload = null;

      function updateTime() {
        Hours.currentCoord().then(function(coordHourObj) {
          scope.coordDataPayload = coordHourObj;
        }, angular.noop); // don't worry about failure :^)
      }

      // XXX: kind of unsure what this $watch code code
      // it might be cruft...
      scope.$watch(attrs.currentCoord, function(value) {
        updateTime();
      });

      updateTime();

      stopTime = $interval(updateTime, INTERVAL_TIME);

      elem.on('$destroy', function() {
        $interval.cancel(stopTime);
      });
    };
  }]);
