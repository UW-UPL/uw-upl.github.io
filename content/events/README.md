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
    "image": image title [Optional] (String)
}
```

If you do not want to include a photo, just do not add the photo property to
the object. We have a default photo if no image is provided.
