import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import { remarkReadingTime } from "./remark-reading-time.mjs";
import playformCompress from "@playform/compress";
import { generateResourceRedirects } from "./src/utils/redirects";

const createConfig = async () => {
  const redirects = await generateResourceRedirects();

  return defineConfig({
    site: "https://www.upl.cs.wisc.edu/",
    redirects,
    integrations: [sitemap(), tailwind(), react(), playformCompress()],
    compressHTML: false,
    markdown: {
      syntaxHighlight: "prism",
      remarkPlugins: [remarkReadingTime],
      optimize: true,
      remarkRehype: {
        footnoteLabel: 'Footnotes',
        footnoteLabelProperties: {
          className: ['sr-only']
        }
      }
    },
    build: {
      format: 'file',
    }
  });
};

export default createConfig();
