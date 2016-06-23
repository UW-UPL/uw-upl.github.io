# Content: Projects

`projects.json` is the list of projects.

## Projects Object Specification:

```
{
  "title": name of project [Required] (String),
  "authors": name(s) of author(s) [Required] (Array of Strings),
  "description": description of project [Optional] (String),
  "link": link to project [Required] (String),
  "image": helpful/example image of project [Optional] (String),
  "imageRemote": if true, will not expect image to be found in 'content/projects' [Optional] (Boolean),
  "imageLink": additional link laid on top of image, defaults to link above [Optional] (String),
  "featuredOnHomepage": feature this project on the homepage [Optional - defaults to false] (Boolean)
}
```
