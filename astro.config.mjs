// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  publicDir: 'public',
  vite: {
    build: {
      rollupOptions: {
        input: {
          main: './src/pages/index.astro',
        },
        output: {
          dir: 'dist',
          entryFileNames: 'assets/[name].js',
          chunkFileNames: 'assets/[name].js',
          assetFileNames: 'assets/[name].[ext]',
        },
      },
    },
  },
  // Copy content/blog directory to public during build
  build: {
    assets: 'assets',
    copyPublicDir: true,
    copyPublicDirOptions: {
      include: ['content/blog/**/*.png'],
    },
  },
});
