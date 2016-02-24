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
        currentCoordName.then(function(hourHolder) {
          /*
          var madisonData = convertToMadisonTime(new Date());
          var dayData = data[DAY_NAMES[madisonData.day]];

          var hourHolder = null;

          var hourKeys = Object.keys(dayData);
          var nowTs = hoursAndMinutesToMillisecondsPastMidnight(madisonData);

          //console.log('Looking for coord hours around: ', madisonData.hour + ':' + madisonData.minute, ' on a ', DAY_NAMES[madisonData.day]);

          //NOTE: this could be a binary search if I wanted to be cool
          var currentOfficeHour = hourKeys
          .map(function(someHourKey) {
            return {
              key: someHourKey,
              ts:  hourKeyToMillisecondsPastMidnight(someHourKey)
            };
          })
          .find(function(obj) {
            //console.log(obj.ts + '<=' + nowTs + '<=' + (obj.ts + COORD_HOUR_DURATION));
            return isOfficeHour(obj.ts, nowTs);
          });

          hourHolder = currentOfficeHour ? dayData[currentOfficeHour.key] : null;
          */
          // TODO: show/hide element if there is a coord
          if (hourHolder) {
            console.log(hourHolder);
            $(elem).attr('class', 'coord-present');
            $(elem).text(hourHolder + ' should be in the lab');
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
