import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import { remarkReadingTime } from "./remark-reading-time.mjs";

import playformCompress from "@playform/compress";

// https://astro.build/config
export default defineConfig({
  site: "https://www.upl.cs.wisc.edu/",
  redirects: {
    "/hours.html": "/hours",
    "/blog.html": "/blog",
    "/coords": "/about",
    // blog post back-links
    "/2022/02/25/incorrect-reification.html": "/blog/incorrect-reification/",
    "/2022/02/02/learning-to-code-with-projects.html":
      "/blog/learning-to-code-with-projects/",
    "/2022/02/09/a-cautionary-tale-of-amazon-web-service-classes.html":
      "/blog/a-cautionary-tale-of-amazon-web-service-classes/",
    "/2022/03/17/exploiting-github-actions.html":
      "/blog/exploiting-github-actions/",
    "/2022/04/03/why-i-use-firefox.html": "/blog/why-i-use-firefox/",
    "/2022/04/16/Game-Design-and-Education.html":
      "/blog/game-design-and-education/",
    "/2022/04/7/Artificial-Consciousness-and-Phenomenology.html":
      "/blog/artificial-consciousness-and-phenomenology/",
    "/2022/05/12/Using-GPT3-To-Write-A-Blog-Post.html":
      "/blog/using-gpt3-to-write-a-blog-post/",
  },
  integrations: [sitemap(), tailwind(), react(), playformCompress()],
  compressHTML: false,
  markdown: {
    syntaxHighlight: "prism",
    remarkPlugins: [remarkReadingTime],
    optimize: true,
  },
});