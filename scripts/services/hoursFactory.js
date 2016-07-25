"use strict";

angular.module('upl-site').
    factory('HoursFactory', ['$http', '$q', function($http, $q) {
        var deferred = $q.defer();
        var service = {};

        /* Main code for Hours service */
        service.list = function() {
          return deferred.promise;
        };

        service.populate = function() {
            $http.get('content/hours/hours.json').then(function(response) {
                deferred.resolve(response.data);
            }, function(response) {
                deferred.reject("Error loading hours");
            });
        }

        /* Below is the code required for `currentCoord` */
        var DAY_NAMES = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ];
        var COORD_MINUTE_DURATION = 50;
        var COORD_HOUR_DURATION = 1000 * 60 * COORD_MINUTE_DURATION;

        function convertToMadisonTime(dateObj) {
          var madisonDay;
          var madisonHour;
          var madisonMinute;
          var isDaylightSavings = dateObj.isDST();

          // what is the offset to CST/CDT?
          var hoursBehind = isDaylightSavings ? 5 : 6;
          var greenwichHour = dateObj.getUTCHours();
          // do "add 24 mod 24" for negative case
          madisonHour = (greenwichHour - hoursBehind + 24) % 24;

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

        // Timestamp is number of MILLIseconds past midnight
        function hoursAndMinutesToTimestamp(hourAndMinuteObj) {
          // expects 24-hour format
          var hourMs  = hourAndMinuteObj.hour   * 1000 * 60 * 60;
          var minMs   = hourAndMinuteObj.minute * 1000 * 60;

          return hourMs + minMs;
        }

        function hourKeyToTimestamp (hourKey) {
          return hoursAndMinutesToTimestamp(hourKeyToObj(hourKey));
        }

        // If the current timestamp (`nowTs`) falls within an office
        // hour timestamp (regardless of day)
        function isOfficeHour(hourTs, nowTs) {
          // XXX: might need to check or mod for overflow/rollover
          //console.log(hourTs + '<=' + nowTs + '<=' + (hourTs + COORD_HOUR_DURATION));
          return (hourTs <= nowTs) && (nowTs <= (hourTs + COORD_HOUR_DURATION));
        }

        // TODO: comment
        service.currentCoord = function(date) {
          // use the current time if it isn't passed
          date = date || new Date();

          var madisonTime = convertToMadisonTime(date);

          var currDay = DAY_NAMES[madisonTime.day];
          // FIXME
          var currTs  = hoursAndMinutesToTimestamp(madisonTime);

          var hourHolder = null;

          return service.list().then(function(hoursData) {
            var currDayData = hoursData[currDay];

            for (var hourKey in currDayData) {
              if (!currDayData[hourKey]) {
                continue;
              }
              var hourTs = hourKeyToTimestamp(hourKey);
              if (isOfficeHour(hourTs, currTs)) {
                // Found the coord!
                var coordTime = hourKeyToObj(hourKey);
                var newHour = coordTime.hour;
                var newMin = coordTime.minute + COORD_MINUTE_DURATION;
                if (newMin > 59) {
                  newHour++;
                  newMin -= 60;
                }
                var ampm = 'AM';
                if (newHour >= 12) {
                  ampm = 'PM';
                  if (newHour > 12) {
                    newHour -= 12;
                  }
                }
                var end = newHour + ':' + newMin + ampm;
                var msg = 'Office hours for ' + currDayData[hourKey] + ': ' + hourKey + ' to ' + end;

                return {
                  coordName:  currDayData[hourKey],
                  start:  hourKey,
                  end:    end,
                  msg:    msg
                };

              } else {
                // no coord at this particular time
              }
           }

            // Nothing found
            return null;

          }, function () { return null; });
        };

        return service;
    }]);
