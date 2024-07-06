import starlight from '@astrojs/starlight-tailwind';
import colorwind from 'colorwind/plugin';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  plugins: [starlight, colorwind],
};
