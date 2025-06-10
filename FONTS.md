# Font Management Guide

This document outlines the process for adding, changing, or updating fonts in this project. Following this process ensures that fonts are loaded efficiently and prevents visual issues like "font flicker" on page load.

The core strategy is to treat font files as static assets, preload them for performance, and define them directly in the global CSS.

## Workflow

1.  **Acquire Font Files**:
    The easiest way to get font files is using `@fontsource` via your package manager. For example, to add the "Open Sans" font, run:
    ```bash
    pnpm add @fontsource/open-sans
    ```

2.  **Copy Font Files to `public/fonts`**:
    After installing the package, locate the font files you need (usually `.woff2` files for modern browsers) inside the `node_modules/@fontsource/<font-name>/files/` directory. Copy the specific weights and styles you need into the `public/fonts/` directory in the project root.

    Example:
    ```bash
    cp node_modules/@fontsource/open-sans/files/open-sans-latin-400-normal.woff2 public/fonts/
    ```

3.  **Preload Fonts in `index.html`**:
    To ensure the browser fetches the fonts with high priority, add `<link rel="preload">` tags to the `<head>` of your `index.html` file for each font file. The `href` path should be relative to the `public` directory.

    Example:
    ```html
    <link rel="preload" href="/fonts/open-sans-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin="anonymous">
    ```

4.  **Define `@font-face` in `index.css`**:
    In `src/index.css`, define the `@font-face` rules for the new font. This tells the browser which files to use for which font family, weight, and style.

    Example:
    ```css
    @font-face {
      font-family: 'Open Sans';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url('/fonts/open-sans-latin-400-normal.woff2') format('woff2');
    }
    ```

5.  **Update Material UI Theme**:
    Finally, update the `fontFamily` property in your Material UI theme configuration (`src/theme.ts`) to use the new font. It's good practice to include fallback fonts.

    Example:
    ```typescript
    const theme = createTheme({
      typography: {
        fontFamily: '"Open Sans", "Roboto", "Helvetica", "Arial", sans-serif',
      },
      // ... other theme options
    });
    ```
