import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  outDir: './docs',
  integrations: [
    starlight({
      title: 'IT Docs',
      social: {
        github: 'https://github.com/GGsmou',
      },
      tableOfContents: {
        maxHeadingLevel: 6,
      },
      sidebar: [
        {
          label: 'Overview',
          autogenerate: { directory: 'all' },
        },
      ],
    }),
  ],
  base: '/it_docs',
});
