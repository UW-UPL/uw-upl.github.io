# UPL UW Website

Built in Astro and using Tailwind, this is the UPL's basic info website and blog. 

## Adding a new Coordinator

Under `/src/content/coordinators` contains the bios for each Coordinator, create a json file called `firstname-lastname.json` and follow the schema described in `/src/content/config.ts` for coordinators.

To add your picture, title it however you like and save it to  `/src/content/profiles`, reference it just by the file name in the json file.

## Adding a new Blog Post

Create a new .mdx file under `/src/content/blog`, following the schema described in `/src/content/config.ts` for blog posts. It can be saved as `blog-post.mdx` or `blog-post/index.mdx`, both will work.

# Astro Generated ReadMe

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:3000`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
