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
          label: 'Home',
          link: '/',
        },
        {
          label: 'Guides',
          items: [{ label: '🎉 Quickstart', link: '/guides/' }],
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
      ],
    }),
  ],
});
