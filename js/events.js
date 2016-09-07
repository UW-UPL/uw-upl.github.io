$(document).ready(function() {
  var eventsSection = $('.onetime-event-list-container');

  var previousEvents = $('<section><h2>Previous events</h2><div><ul class="onetime-event-list"></ul></div>');
  var previousEventsList = previousEvents.find('ul').first();

  var upcomingEvents = $('<section><h2>Upcoming events</h2><div><ul class="onetime-event-list"></ul></div>');
  var upcomingEventsList = upcomingEvents.find('ul').first();

  var events = eventsSection.find('.event');
  eventsSection.find('.event').remove();
  eventsSection.find('h2').remove();

  var now = moment();

  events.each(function(i, event) {
    var dateElem = $(event).find('.event-date').first();
    var date = moment(dateElem.text(), 'YYYY-MM-DD h:mm A');
    dateElem.text(date.format('dddd, MMMM Do YYYY, h:mm A'));
    if (date.isBefore(now)) {
      previousEventsList.append(event);
    } else {
      upcomingEventsList.prepend(event);
    }
  });

  if (upcomingEventsList.children().length > 0) {
    eventsSection.append(upcomingEvents);
  }

  if (previousEventsList.children().length > 0) {
    eventsSection.append(previousEvents);
  }

  $('.onetime-event-list-container').css('display', 'block');

});
