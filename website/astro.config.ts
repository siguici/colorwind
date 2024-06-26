import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://colorwind.js.org',
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
          label: 'Home',
          link: '/',
        },
        {
          label: '📖 Guides',
          items: [
            {
              label: 'Getting Started 🎉',
              link: '/guides/',
            },
          ],
        },
        {
          label: '📚 Reference',
          autogenerate: {
            directory: 'reference',
          },
        },
      ],
      customCss: ['./src/design/global.css'],
    }),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
