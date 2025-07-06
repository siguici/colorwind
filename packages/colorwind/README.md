# [🎨 ColorWind](https://colorwind.js.org)

**ColorWind** is a [TailwindCSS](https://tailwindcss.com) plugin that simplifies
light/dark color scheme management using intuitive and expressive class names.
It bridges the gap between Tailwind’s numeric color scales (50–950)
and accessible theming, allowing you to write once, adapt everywhere.

---

## 🚀 Installation

You can install [`ColorWind`](https://colorwind.js.org)
from [`NPM`](https://npmjs.com/package/colorwind) or [`JSR`](https://jsr.io/@siguici/colorwind):

- Using `npm`:

  [`NPM`](https://npmjs.com/package/colorwind):

  ```bash
  npm install colorwind
  ```

  [`JSR`](https://jsr.io/@siguici/colorwind):

  ```bash
  npx jsr add @siguici/colorwind
  ```

- Using `Yarn`:

  [`NPM`](https://npmjs.com/package/colorwind):

  ```bash
  yarn add colorwind
  ```

  [`JSR`](https://jsr.io/@siguici/colorwind):

  ```bash
  yarn dlx jsr add @siguici/colorwind
  ```

- Using `PNPM`:

  [`NPM`](https://npmjs.com/package/colorwind):

  ```bash
  pnpm add colorwind
  ```

  [`JSR`](https://jsr.io/@siguici/colorwind):

  ```bash
  pnpm dlx jsr add @siguici/colorwind
  ```

- Using `Bun`:

  [`NPM`](https://npmjs.com/package/colorwind):

  ```bash
  bun install colorwind
  ```

  [`JSR`](https://jsr.io/@siguici/colorwind):

  ```bash
  bunx jsr add @siguici/colorwind
  ```

- Using `Deno`:

  [`NPM`](https://npmjs.com/package/colorwind):

  ```bash
  deno install npm:colorwind
  ```

  [`JSR`](https://jsr.io/@siguici/colorwind):

  ```bash
  deno add @siguici/colorwind
  ```

  Without install:

  ```typescript
  import colorwind from 'jsr:@siguici/colorwind';
  ```

---

## 🔧 Configuration

Add `colorwind` to your Tailwind configuration file:

### Node/NPM

```ts
import colorwind from 'colorwind';

/** @type {import('tailwindcss').Config} */
export default {
  plugins: [colorwind],
};
```

### Deno/JSR

```ts
import colorwind from 'jsr:@siguici/colorwind';

export default {
  plugins: [colorwind],
};
```

---

## 💡 Usage

Write utility-first color classes that **automatically adapt**
between **light and dark** modes — no extra logic needed.

### 🎯 Naming Convention

Use:

```txt
<variant>-<color>[-X][-reverse][/opacity]
```

Where:

| Part       | Description                                          |
| ---------- | ---------------------------------------------------- |
| `variant`  | Tailwind utility (e.g. `text`, `bg`, `border`, etc.) |
| `color`    | Tailwind color name (e.g. `blue`, `red`)             |
| `X`        | Color intensity (0 to 4)                             |
| `reverse`  | (optional) Inverts the light/dark pairing            |
| `/opacity` | (optional) Tailwind opacity shorthand                |

#### Color Intensity Mapping

| Level  | Light Mode                | Dark Mode   |
| ------ | ------------------------- | ----------- |
| `0`    | `color-50`                | `color-950` |
| `1`    | `color-100`               | `color-900` |
| `2`    | `color-200`               | `color-800` |
| `3`    | `color-300`               | `color-700` |
| `4`    | `color-400`               | `color-600` |
| (none) | `color-500` in both modes |             |

---

## ✨ Examples

```html
<!-- Auto-adjusting to theme -->
<p class="text-blue-0">Adaptive blue shade</p>

<!-- Explicit light/dark variants -->
<p class="text-blue-light-1">Blue-100 (light only)</p>
<p class="text-blue-dark-1">Blue-900 (dark only)</p>

<!-- Reversed behavior -->
<p class="bg-red-3-reverse">Red-300 dark / Red-700 light</p>

<!-- Opacity -->
<p class="text-green-2/80">Green-200/800 with 80% opacity</p>

<!-- Multiple utilities, one color -->
<div class="text underline text-decoration-blue-1">
  Underlined blue text
</div>
```

---

## 📘 Supported Utilities

ColorWind supports the following Tailwind color utilities:

| Utility      | CSS Property            |
| ------------ | ----------------------- |
| `text`       | `color`                 |
| `bg`         | `background-color`      |
| `border`     | `border-color`          |
| `outline`    | `outline-color`         |
| `ring`       | `--tw-ring-color`       |
| `shadow`     | `--tw-shadow-color`     |
| `decoration` | `text-decoration-color` |
| `accent`     | `accent-color`          |
| `caret`      | `caret-color`           |
| `divide`     | `border-color`          |
| `fill`       | `fill`                  |
| `stroke`     | `stroke`                |

---

## 🪪 License

[MIT](./LICENSE.md) © [SIGUI Kessé Emmanuel](https://siguici.deno.dev)
