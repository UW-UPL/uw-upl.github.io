'use strict';
angular.module('upl-site')
// TODO: should this be a controller?
// EVEN BETTER: add "main" func and helpers to Hours factory?
.directive('currentCoord', ['HoursFactory', '$interval',
  function(Hours, $interval) {
    return function(scope, elem, attrs) {
      //var hoursData = Hours.list(); // a promise
      var currentCoordName = Hours.currentCoord(); // a promise
      var stopTime  = null;
      var INTERVAL_TIME = 1000 * 60 * 5; // five minutes

      function updateTime() {
        currentCoordName.then(function(hourHolderMsg) {
          // TODO: show/hide element if there is a coord
          if (hourHolderMsg) {
            console.log(hourHolderMsg);
            $(elem).attr('class', 'coord-present');
            //            $(elem).text(hourHolderMsg + ' should be in the lab');
            $(elem).text(hourHolderMsg);
          } else {
            console.log('no hour holder');
          }

        }, angular.noop);
      }

      scope.$watch(attrs.currentCoordBanner, function(value) {
        updateTime();
      });

      // TODO: remove 2000 (only for testing);
      stopTime = $interval(updateTime, 2000 || INTERVAL_TIME);

      elem.on('$destroy', function() {
        $interval.cancel(stopTime);
      });

    };
  }]);
