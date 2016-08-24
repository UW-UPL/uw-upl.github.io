var eventsSection = $('#events');

var previousEvents = $('<section><h2>Previous events</h2><div><ul class="onetime-event-list"></ul></div>');
var previousEventsList = previousEvents.find('ul').first();

var upcomingEvents = $('<section><h2>Upcoming events</h2><div><ul class="onetime-event-list"></ul></div>');
var upcomingEventsList = upcomingEvents.find('ul').first();

var events = $('.onetime-event-list-container .event');
eventsSection.children('.div').remove();

var now = moment();

events.each(function(i, event) {
  var dateElem = $(event).find('.event-date').first();
  var date = moment(dateElem.text(), 'YYYY-MM-DD h:mm A');
  dateElem.text(date.format('dddd, MMMM Do YYYY, h:mm A'));
  if (date.isBefore(now)) {
    previousEventsList.append(event);
  } else {
    upcomingEventsList.append(event);
  }
});

if (upcomingEventsList.children().length > 0) {
  eventsSection.append(upcomingEvents);
}

if (previousEventsList.children().length > 0) {
  eventsSection.append(previousEvents);
}
