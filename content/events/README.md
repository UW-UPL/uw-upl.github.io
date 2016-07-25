# Content: Events

`events.json` is the list of UPL events

## Event Object Specification:

```
{
    "title": event title [Required] (String),
    "date": event date and time [Required] (Format String: "mm/dd/yyyy H:MM p;
    example: "02/18/2018 7:00pm"),
    "location": event location [Required] (String),
    "description": event description [Required] (String),
    "image": image title [Optional] (String),
    "repeats": see 'Repeating Events' below [Optional] (Object)
}
```

If you do not want to include a photo, just do not add the photo property to
the object. We have a default photo if no image is provided.

### Repeating Events

If you would like to set up a repeating event, use the following schema:

```
{
  "<other entries>": "...",
  "repeats": {
    "when": "<repeat type string>",
    "ends": "<end date string>"
  }
}
```

#### `when`

Right now, only supports `"weekly"` (for events that repeat every seven days).

#### `ends`

When the repeating event ends. If present, must be a date-parseable string
by ECMAScript's `Date` class (i.e. `new Date(dateString)` gives the Date
object you want).

If __not__ present, it will default to a "never-ending" repeat.
