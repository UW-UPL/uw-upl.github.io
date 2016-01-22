# Content: Coords

`coords.json` is the list of UPL Coordinators

## Coordinator Object Specification:

```
{
    "id": csl username [Required] (String),
    "name": FirstName LastName [Required] (String),
    "year": student standing (e.g. Sophomore) [Required] (String),
    "major": major(s) [Required] (String),
    "github": GitHub url [Optional] (String - include 'http://'),
    "photo": filename of your photo [Optional] (String - just the file name, not path, save in same
           directory as this json)
}
```

If you do not want to include a photo, just do not add the photo property to
the object. We have a default (anonymous) photo if no image is provided.
