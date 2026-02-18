# Rowley Recipes

A simple Nuxt 3 application with SCSS support.

## Setup

Install dependencies:

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Build

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Project Structure

- `assets/scss/` - SCSS files (variables, mixins, main styles)
- `assets/scss/themes/` - Theme files (default, dark, warm, minimal)
- `components/` - Vue components
- `layouts/` - Layout components
- `pages/` - File-based routing
- `public/` - Static assets
- `content/recipes/` - Recipe markdown files

## Themes

The application uses CSS custom properties (CSS variables) for theming, allowing runtime theme switching without recompilation.

### Available Themes

- **Default**: Clean green/blue theme with modern aesthetic
- **Dark**: Dark mode with deep backgrounds and light text
- **Warm**: Cozy theme with oranges, reds, and warm grays
- **Minimal**: Clean grayscale palette for simple, elegant design

### Switching Themes Programmatically

Use the `useTheme` composable to switch themes at runtime:

```vue
<script setup>
const { setTheme, currentTheme } = useTheme()

// Switch to dark theme
setTheme('dark')

// Access current theme
console.log(currentTheme.value) // 'dark'
</script>
```

### Theme Files

Theme CSS files are located in `assets/scss/themes/`:
- `_default.css` - Default theme CSS variables
- `_dark.css` - Dark theme CSS variables
- `_warm.css` - Warm theme CSS variables
- `_minimal.css` - Minimal theme CSS variables

### Creating a New Theme

1. Create a new CSS file in `assets/scss/themes/` (e.g., `_yourtheme.css`)
2. Copy the structure from an existing theme file
3. Update all CSS custom property values
4. Add the theme to `composables/useTheme.ts` in the `themeValues` object
5. Update the `Theme` type to include your new theme name

