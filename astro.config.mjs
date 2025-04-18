// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    prefetch: {
        prefetchAll: true
    },
    redirects: {
        "/discord": {
          status: 302,
          destination: "https://discord.gg/dmefFzm"
        },
    }
});
