# ColorWind 🎨

TailwindCSS plugin simplifying light/dark color scheme management with intuitive class names.

## 🚀 Installation

You can install the plugin :

- Using `npm`:

  ```bash
  npm install colorwind
  ```

  From `JSR`:

  ```bash
  npx jsr add @siguici/colorwind
  ```

- Using `Yarn`:

  ```bash
  yarn add colorwind
  ```

  From `JSR`:

  ```bash
  yarn dlx jsr add @siguici/colorwind
  ```

- Using `PNPM`:

  ```bash
  pnpm add colorwind
  ```

  From `JSR`:

  ```bash
  pnpm dlx jsr add @siguici/colorwind
  ```

- Using `Bun`:

  ```bash
  bun install colorwind
  ```

  From `JSR`:

  ```bash
  bunx jsr add @siguici/colorwind
  ```

- Using `Deno`:

  ```bash
  deno add @siguici/colorwind
  ```

  Without install:

  ```typescript
  import colorwind from "jsr:@siguici/colorwind";
  ```

## 💡 Usage

Simply use the provided class names in your `HTML` or `JSX` to apply color styles that adapt to the light or dark mode.

### Using Color Classes

Use the following class convention to apply color styles that adapt to light/dark themes:

- `variant-color-[light|dark]-X` where variant is a `TailwindCSS` variant (`text`, `bg`, `border`, etc.), color is the color name (e.g., `blue`, `red`, `green`, etc.), and X corresponds to:

  - 0: color-50 in light mode or color-950 in dark mode
  - 1: color-100 in light mode or color-900 in dark mode
  - 2: color-200 in light mode or color-800 in dark mode
  - 3: color-300 in light mode or color-700 in dark mode
  - 4: color-400 in light mode or color-600 in dark mode
- You can also use variant-color for variant-color-500 (adapts to theme)


### Example in HTML

```html
<!-- Light mode -->
<p class="text-blue-light-0">This is text in a light blue shade.</p>

<!-- Dark mode -->
<p class="text-blue-dark-0">This is text in a dark blue shade.</p>

<!-- Default color (adapts to theme) -->
<p class="text-blue-0">This is text in the default blue shade.</p>
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md file](./LICENSE.md) for details.
