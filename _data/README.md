# Content: Coords

`coords.yaml` is the list of UPL Coordinators

## Coordinator Object Specification:

```
- id: csl username [Required] (String),
  name: FirstName LastName [Required] (String),
  year: student standing (e.g. Sophomore) [Required] (String),
  major: major(s) [Required] (String),
  github: GitHub url [Optional] (String - include 'http://'),
  photo: filename of your photo [Optional] (String - just the file name, not path, save in same directory as this json),
  emoji: favorite emoji name
```

Please make your photo have square dimensions to prevent bad stretching/shrinking.

If you do not want to include a photo, just do not add the photo property to
the object. We have a default (anonymous) photo if no image is provided.

# Content: Events

`events.yaml` is the list of UPL events

## Event Object Specification:

```
- title: event title [Required] (String),
  date: event date and time [Required] (Format String: "yyyy-mm-dd H:MM p; example: "2018-02-18 7:00pm"),
  location: event location [Required] (String),
  description: event description HTML [Required] (String),
  image: image title [Optional] (String),
  repeats: see 'Repeating Events' below [Optional] (Object)
```

If you do not want to include a photo, just do not add the photo property to
the object. We have a default photo if no image is provided.

<!-- TODO
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
-->

# Content: Hours

`hours.yaml` is the list of coord hours

## Hours Object Specification:

```
- day: <day of week>
  times:
    <start of hour (e.g. '8:50AM')>: <coord name>
```

Just supply the empty string (`""`) if no coordinator is present at that time.

# Content: Projects

`projects.yaml` is the list of projects.

## Projects Object Specification:

```
- title: name of project [Required] (String),
  authors: name(s) of author(s) [Required] (Array of Strings),
  description: description of project [Optional] (String),
  link: link to project [Required] (String),
  image: helpful/example image of project [Optional] (String),
  imageRemote: if true, will not expect image to be found in 'content/projects' [Optional] (Boolean),
  imageLink: additional link laid on top of image, defaults to link above [Optional] (String),
  featuredOnHomepage: feature this project on the homepage [Optional - defaults to false] (Boolean)
```

# Content: Lab

`lab.yaml` is general lab information

## Lab Specification:

```
hours: if the lab is currently holding hours. [Required] (Boolean)
```
