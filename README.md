# 🎨 ColorWind

**ColorWind** is a powerful [TailwindCSS](https://tailwindcss.com) plugin
that makes managing light and dark color schemes easy, expressive, and automatic.

This repository contains the full source code,
plugin package, and documentation for the project.

> 📦 The published plugin lives inside [`/packages/colorwind`](./packages/colorwind)

---

## 📚 Documentation

Interactive usage guide, theming examples, and live playground:

👉 **[https://colorwind.js.org](https://colorwind.js.org)**

---

## 📦 Packages

| Package           | Description                         | Registry                      |
|------------------|-------------------------------------|-------------------------------|
| [`colorwind`](./packages/colorwind) | TailwindCSS plugin for automatic color theming | [NPM](https://npmjs.com/package/colorwind), [JSR](https://jsr.io/@siguici/colorwind) |

---

## 🚀 Getting Started

Install from your preferred package manager:

```bash
npm install colorwind
````

Or use [JSR](https://jsr.io/@siguici/colorwind):

```bash
npx jsr add @siguici/colorwind
```

Then, register the plugin in your Tailwind config:

```ts
import colorwind from 'colorwind';

export default {
  plugins: [colorwind],
};
```

---

## 🧠 Why ColorWind?

* Simplifies **light/dark mode theming** with one class.
* Uses **intuitive naming** for color intensity and adaptation.
* Supports **all Tailwind color utilities**, including gradients and opacity.
* Automatically **inverts colors** when needed using the `-reverse` suffix.

Read the full plugin usage guide at [colorwind.js.org/guides](https://colorwind.js.org/guides)

---

## 🛠 Development

To contribute or run locally:

```bash
pnpm install
pnpm dev
```

Then visit [`localhost:4321`](http://localhost:4321)
to preview the documentation locally.

---

## 🤝 Contributing

Found a bug or have a feature request?

* Open an issue on [GitHub Issues](https://github.com/siguici/colorwind/issues)
* Or submit a PR — we welcome contributions!

---

## 📄 License

[MIT](./packages/colorwind/LICENSE.md) © [SIGUI Kessé Emmanuel](https://siguici.deno.dev)

---

## 💫 Credits

Built with ❤️ using [TailwindCSS](https://tailwindcss.com), [Astro](https://astro.build), and [Starlight](https://starlight.astro.build).
