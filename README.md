# contributing to the UPL website

Thanks for helping improve the UPL website! This guide covers adding events, projects, and coordinator information.

## how do i do things?

1. Fork the repository on GitHub
2. Clone your fork locally
3. Create a new branch for your changes
4. Install dependencies: `npm i`
5. Start the dev server: `npx run astro dev`
6. Make your changes following the guidelines below
7. Submit a pull request

Need help with Git/GitHub? Ask a coordinator!

## adding events

Create a JSON file in `src/content/events/` following existing naming conventions.

```json
{
  "title": "Event Name",
  "date": "YYYY-MM-DDTHH:MM:SS",
  "description": "Event description with relevant details.",
  "link": "https://example.com/link (optional)"
}
```

Use [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date format. Include speaker names for lightning talks.

## adding projects

Create a JSON file in `src/content/projects/` following existing naming conventions.

```json
{
  "title": "Project Name",
  "source": "https://github.com/username/repo",
  "writeup": "https://example.com/blog-post (optional)",
  "description": "Brief description of the project.",
  "image": "../../img/projects/image-name.jpg",
  "authors": ["Author Name"]
}
```

Add images to `public/img/projects/`. Use square images (600x600px recommended).

## adding coordinators

Create a JSON file in `src/content/coords/` following existing naming conventions.

```json
{
  "name": "Coordinator Name",
  "isActive": true,
  "emoji": "😎",
  "grade": "Senior",
  "image": "../../img/coords/coordinator-name.webp",
  "study": ["Major"],
  "personalLink": "https://example.com (optional)",
  "github": "username (optional)"
}
```

Add photos to `public/img/coords/` as square images.

## questions?

- Ask in the UPL Discord
- Email upl@cs.wisc.edu
- Stop by the UPL lab (CS 2618)
