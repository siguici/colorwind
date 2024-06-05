import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://siguici.github.io',
  base: 'colorwind',
  compressHTML: true,
  integrations: [
    starlight({
      favicon: '/favicon.svg',
      logo: {
        src: './src/assets/colorwind.svg',
        alt: '🎨',
        replacesTitle: false,
      },
      title: 'ColorWind',
      social: {
        github: 'https://github.com/siguici/colorwind',
      },
      editLink: {
        baseUrl: 'https://github.com/siguici/colorwind/edit/main/website/',
      },
      sidebar: [
        {
          label: 'Guides',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Example Guide', link: '/guides/example/' },
          ],
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
      ],
    }),
  ],
});
