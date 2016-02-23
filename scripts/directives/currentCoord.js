'use strict';
angular.module('upl-site')
// should this be a controller?
.directive('currentCoord', ['HoursFactory', '$interval',
  function(Hours, $interval) {
    return function(scope, elem, attrs) {
      var hoursData = Hours.list(); // a promise
      var stopTime  = null;
      var INTERVAL_TIME = 1000 * 60 * 5; // five minutes
      var DAY_NAMES = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ];
      var COORD_HOUR_DURATION = 1000 * 60 * 50; // 50 minutes

      function convertToMadisonTime(dateObj) {
        //I apologize for the esoteric-ness of the following code
        //See http://bit.ly/1LGQwnq for people who actually know what's up
        var madisonDay;
        var madisonHour;
        var madisonMinute;
        var isDaylightSavings;

        var jan = new Date(dateObj.getFullYear(), 0, 1);
        var jul = new Date(dateObj.getFullYear(), 6, 1);

        var janOff = jan.getTimezoneOffset();
        var julOff = jul.getTimezoneOffset();

        var stdTimezoneOffset = Math.max(janOff, julOff);

        var currOff = dateObj.getTimezoneOffset();

        isDaylightSavings = currOff < stdTimezoneOffset;

        // what is the offset to CST/CDT?
        var hoursBehind = isDaylightSavings ? 5 : 6;
        var greenwichHour = dateObj.getUTCHours();
        // do the "plus 12 mod 12" for negative case
        madisonHour = (greenwichHour - hoursBehind + 12) % 12;

        // not necessarily correct if you are outside the US
        madisonMinute = dateObj.getUTCMinutes();

        var currDay = dateObj.getUTCDay();

        // if it is a new day in Greenwich
        if (madisonHour > greenwichHour) {
          madisonDay = (currDay - 1) % (DAY_NAMES.length);
        } else {
          madisonDay = currDay;
        }

        return {
          day: madisonDay,
          hour: madisonHour,
          minute: madisonMinute
        };
      }

      function hourKeyToObj(hourKey) {
        // e.g. '12:05PM' -> { hour: 12, minute: 5  }
        // e.g. '4:35PM'  -> { hour; 16, minute: 35 }

        // first find the hour (24-hour format)
        var hourPrefix = parseInt(hourKey, 10);

        if (hourPrefix < 12 && hourKey.indexOf('PM') > -1) {
          hourPrefix += 12;
        } else if (hourPrefix === 12 && hourKey.indexOf('AM') > -1) {
          hourPrefix = 0;
        }

        // then find the minute
        var minuteRegex = /^\d+:(\d+)([AP]M)$/

        var rgxMatch = hourKey.match(minuteRegex);

        if (!rgxMatch) {
          throw Error('Bad date format!');
        }

        var minuteStr = rgxMatch[1];

        return {
          hour: hourPrefix,
          minute: parseInt(minuteStr, 10)
        };
      }

      function hoursAndMinutesToMillisecondsPastMidnight(hourAndMinuteObj) {
        // expects 24-hour format
        var hourMs  = hourAndMinuteObj.hour * 1000 * 60 * 60;
        var minMs   = hourAndMinuteObj.minute * 1000 * 60;

        return hourMs + minMs;
      }

      function hourKeyToMillisecondsPastMidnight (hourKey) {
        return hoursAndMinutesToMillisecondsPastMidnight(hourKeyToObj(hourKey));
      }

      function isOfficeHour(hourTs, nowTs) {
        return (hourTs <= nowTs) && (nowTs <= (hourTs + COORD_HOUR_DURATION));
      }

      function updateTime() {
        hoursData.then(function(data) {
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

          // TODO: show/hide element if there is a coord
          if (hourHolder) {
            $(elem).css('background-color', 'green');
            //console.log(hourHolder);
            $(elem).text(hourHolder + ' should be in the lab');
          } else {
            //console.log('no hour holder');
            $(elem).css('background-color', 'red').text('[ I should be hidden ]');
          }

        }, angular.noop);
      }

      scope.$watch(attrs.currentCoordBanner, function(value) {
        updateTime();
      });

      $(elem).css('background-color', 'blue');

      // TODO: remove 2000 (only for testing);
      stopTime = $interval(updateTime, 2000 || INTERVAL_TIME);

      elem.on('$destroy', function() {
        $interval.cancel(stopTime);
      });

    };
  }]);
