"use strict";



angular.module('upl-site')

    .factory('EventsFactory', ['$http', '$q', '$sce', function($http, $q, $sce) {

        var deferred = $q.defer();

        var service = {};



        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];



        const nowDate = new Date();
        const nowTimestamp = nowDate.getTime();



        service.list = function() {

            return deferred.promise;

        };

        // this function determines how much of an offset (0/+1/-1) we need
        // when comparing two dates WRT daylight savings
        // `basis` is the date that we are comparing target to
        // it is often the `startDate` of a repeating event
        const getDSTOffset = function(basisDate, targetDate) {
          const oneHour = 60 * 60 * 1000;
          if (basisDate.isDST() == targetDate.isDST()) {
            // no difference in timing
            return 0;
          } else if (basisDate.isDST()) {
            // basis DST: true  | target DST: false
            return +oneHour;
          } else {
            // basis DST: false | target DST: true
            return -oneHour;
          }
        };


        // see http://stackoverflow.com/questions/11887934/check-if-daylight-saving-time-is-in-effect-and-if-it-is-for-how-many-hours
        var createRepeatingEvents = function (repeatingEvent) {
          const repeatData = repeatingEvent.repeats;

          // handle garbage
          if (!repeatData) {
            return [];
          }

          const startDate = new Date(repeatingEvent.date);
          const when = repeatData.when;
          const ends = repeatData.ends;
          const endDate = ends ? new Date(ends) : null;

          const endsBeforeNow = endDate && endDate.getTime() <= nowTimestamp;

          if (endsBeforeNow) {
            // if the event has already finished repeating,
            // there's no need to add a new repeat event
            return [];
          }

          const startsAfterNow = startDate.getTime() >= nowTimestamp;

          if (startsAfterNow) {
            // if the event starts (repeating) after now,
            // there's no need to create an other repeat events
            return [];
          }

          var repeatOffset;

          // what kind of repeat type is it?
          switch(when) {
            case 'weekly':
              repeatOffset = 7 * 24 * 60 * 60 * 1000;
              break;
            default:
              return [];
          }

          const tooShortToRepeat =
            endDate && (startDate.getTime() + repeatOffset >= endDate.getTime());

          if (tooShortToRepeat) {
            // if a single repeat goes beyond the end date,
            // there is no need to create a new event
            // (this is kind of a stupidity check :^|)
            return [];
          }

          // we may return up to 2 events
          // the event that was in between the first repeat and now
          // (i.e. the last repeat of this event)
          // and the next (upcoming) repeat event
          var newEvents = [];

          // now for a little math to get the most recent event BEFORE now
          const timeElapsedBetweenNowAndStart = nowTimestamp - startDate.getTime();
          // integer division
          const numElapsedRepeats = Math.floor(timeElapsedBetweenNowAndStart / repeatOffset);

          const newPreviousEventTimestamp =
            startDate.getTime() + (numElapsedRepeats * repeatOffset);

          const repeatingEventTitle = (when.toUpperCase()) + ' REPEAT: ' + repeatingEvent.title;

          // if we can have a new previous repeating event,
          if (startDate.getTime() + repeatOffset < nowTimestamp) {
            var newPreviousEvent = angular.copy(repeatingEvent);

            const prevDSTOffset =
              getDSTOffset(startDate, new Date(newPreviousEventTimestamp));

            newPreviousEvent.date = newPreviousEventTimestamp + prevDSTOffset;
            newPreviousEvent.title = repeatingEventTitle;

            newEvents.push(newPreviousEvent);
          }

          // now for the upcoming repeating event
          // if we've gotten here, we know that we can DEFINITELY include it
          const newUpcomingEventTimestamp =
            startDate.getTime() + ((numElapsedRepeats + 1) * repeatOffset);

          var newUpcomingEvent = angular.copy(repeatingEvent);

          const upcomingDSTOffset =
            getDSTOffset(startDate, new Date(newUpcomingEventTimestamp));

          newUpcomingEvent.date = newUpcomingEventTimestamp + upcomingDSTOffset;
          newUpcomingEvent.title = repeatingEventTitle;

          newEvents.push(newUpcomingEvent);

          return newEvents;
        };


        service.populate = function() {

            $http.get('content/events/events.json').then(function(response) {

                // Success

                var events = {'Upcoming': [], 'Previous': []};

                // First add any repeating events for processing
                var addRepeats = function(accumulation, currentEvent) {

                  // on failure, createRepeatingEvents returns an empty array
                  // so nothing (bad) will happen if there IS a failure
                  return accumulation.concat(
                    currentEvent, createRepeatingEvents(currentEvent)
                  );
                };

                var eventsData = response.data.reduce(addRepeats, []);

                eventsData.forEach(function(event) {


                    // allow html in descriptions

                    event.description = $sce.trustAsHtml(event.description);


                    event.timestamp = new Date(event.date);

                    event.dateString = "";

                    var day = event.timestamp.getDate();

                    var month = event.timestamp.getMonth();

                    var year = event.timestamp.getFullYear();

                    var hours = event.timestamp.getHours();

                    var ampm;

                    if (hours > 12) {

                        ampm = "PM";

                    } else {

                        ampm = "AM";

                    }

                    hours = hours % 12;

                    if (hours === 0) {
                        hours = 12;
                    }

                    var mins = event.timestamp.getMinutes();

                    if (mins < 10) {

                        mins = "0" + mins;

                    }

                    event.dateString = days[event.timestamp.getDay()] + ', ' + months[month] + ' ' + day + ', ' + year + ' at ' + hours + ':' + mins + ' ' + ampm;

                    // for linking to a single event
                    var linkify = function (event) {
                      var name = event.title.toLowerCase().replace(/[\s-]/g, '_');
                      name = encodeURIComponent(name);
                      var time = event.timestamp.getTime().toString();

                      return name + '-' + time;
                    };

                    event.link = linkify(event);

                    // place each event its in correct partition
                    if (event.timestamp >= nowTimestamp) {

                        events['Upcoming'].push(event);

                    } else {

                        events['Previous'].push(event);

                    }

                });

                // Sort upcoming events in chronological order and

                // previous events in reverse-chronological order

                events['Upcoming'].sort(function(a, b) {

                    return a.timestamp - b.timestamp;

                });

                events['Previous'].sort(function(a, b) {

                    return b.timestamp - a.timestamp;

                });

                deferred.resolve(events);

            }, function(response) {

                // Error

                deferred.reject("Error loading events");

            });

        };



        return service;

    }]);

