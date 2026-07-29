// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  markdown: {
    processor: unified(),
  },
});
