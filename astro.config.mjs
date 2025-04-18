// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  prefetch: {
      prefetchAll: true
  },

  integrations: [svelte()],

  redirects: {
        "/discord": {
          status: 302,
          destination: "https://discord.gg/dmefFzm"
        },
    }
});