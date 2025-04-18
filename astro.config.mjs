// @ts-check
import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  prefetch: {
      prefetchAll: true
  },

  integrations: [preact()]
});