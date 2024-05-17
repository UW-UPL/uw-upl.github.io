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
    "/blog.html": "/blog"
  },
  integrations: [sitemap(), tailwind(), react(), playformCompress()],
  compressHTML: false,
  markdown: {
    syntaxHighlight: "prism",
    remarkPlugins: [remarkReadingTime],
    optimize: true
  }
});