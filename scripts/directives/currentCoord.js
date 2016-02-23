//'use strict'; TODO: see if we want to use this

angular.module('upl-site')
.directive('current-coord-banner', ['HoursFactory', '$interval', 'moment',
  function(Hours, $interval, moment) {
    return function(scope, elem, attrs) {
      var hoursData = Hours.list(); // a promise
      var stopTime  = null;
      var INTERVAL_TIME = 1000 * 60 * 5; // five minutes
      var DAY_NAMES = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday'
      ];
      var COORD_HOUR_DURATION = 50; // 50 minutes
      // TODO convert hour json data keys to millsecs past midnight

      function convertToMadisonTime(dateObj) {
        //I apologize for the esoteric-ness of the following code
        //See http://bit.ly/1LGQwnq for people who actually know what's up
        var madisonDay;
        var madisonHour;
        var madisonMinute;
        var isDaylightSavings;

        var jan = new Date(this.getFullYear(), 0, 1);
        var jul = new Date(this.getFullYear(), 6, 1);

        var janOff = jan.getTimezoneOffset();
        var julOff = jul.getTimezoneOffset();

        var stdTimezoneOffset = Math.max(janOff, julOff);

        var currOff = dateObj.getTimezoneOffset();

        isDaylightSavings = currOff < stdTimezoneOffset;

        // what is the offset to CST/CDT?
        var hoursBehind = isDaylightSavings ? 5 : 6;
        var greenwichHour = dateObj.getUTCHours();
        madisonHour = greenwichHour - hourOffset;

        // not necessarily correct if you are outside the US
        madisonMinute = dateObj.getUTCMinutes();

        var currDay = dateObj.getUTCDay();

        // if it is a new day in Greenwich
        if (madisonHour > dateObj.getUTCHours()) {
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

        var hourPrefix = parseInt(hourKey, 10);

        if (hourPrefix < 12 && hourKey.include('PM') > -1) {
          hourPrefix += 12;
        }

        var minuteRegex = /^\d+:(\d)[AP]M$/

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

      function isOfficeHour(prev, curr, next, now) {
        //TODO
      }

      function updateTime() {
        hoursData.then(function(data) {
          var madisonData = convertToMadisonTime(new Date());
          var dayData = data[DAY_NAMES[madisonData.day]];

          var hourData = [];
          var hourHolder = null;

          var hourKeys = Object.keys(dayData);
          //var mappedHours = [];


          //Object.keys(dayData).forEach(function(hourKey, ind

          for (var hourKey in dayData) {
            var parsedObj = hourKeyToObj(hourKey);
            hourData.push({
              key: hourKey
              // in 24-hour format
              hour: parsedObj.hour,
              minute: parsedObj.minute
            });
          }

          hourData.sort(function(a, b) {
            return a.hour - b.hour
          });

          hourData.forEach(function(someHourObj, index) {
            var prev = hourData[index - 1] || null;
            var next = hourData[index + 1] || null;

            if (isOfficeHour(prev, someHourObj, next, madisonData)) {
              hourHolder = dayData[someHourObj.key];
              return;
            }
          });

          if (hourHolder) {
            //TODO
          } else {
            //TODO
          }

          // TODO: something with `element.text`

        }, angular.noop);
      }

      scope.$watch(attrs.currentCoordBanner, function(value) {
        updateTime();
      });

      stopTime = $interval(updateTime, INTERVAL_TIME);

      elem.on('$destroy', function() {
        $interval.cancel(stopTime);
      });

    };
    /*
    return {
      restrict: 'E',
      template: '<div class="current-coord-banner"></div>',
    };
    */
  }]);
