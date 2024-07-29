import starlight from '@astrojs/starlight-tailwind';
import colorwind from 'colorwind';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  plugins: [starlight, colorwind],
};
