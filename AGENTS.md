# AGENTS.md

This file provides context for AI coding assistants working on this codebase.

## Project Overview

A two-player life counter web app for tabletop card games (e.g., Magic: The
Gathering). Players can increment/decrement life totals by tapping zones, and
customize starting life and player colors via a settings menu.

## Tech Stack

- **Language**: TypeScript (strict mode)
- **Build**: Vite (using rolldown-vite)
- **Linting/Formatting**: Biome
- **Package Manager**: pnpm
- **Styling**: Vanilla CSS with custom properties

## Project Structure

```sh
src/
├── main.ts      # App entry point, DOM setup, event handlers, state management
├── counter.ts   # Counter module (life tracking, increment/decrement)
├── style.css    # All styles, responsive design, CSS custom properties
index.html       # Semantic HTML structure with accessibility attributes
```

## Development Commands

```sh
pnpm dev      # Start dev server
pnpm build    # Type check + production build
pnpm check    # Run Biome linter + markdownlint
pnpm format   # Auto-fix formatting issues
```

## Code Conventions

### TypeScript

- **Strict null checking**: Never use non-null assertions (`!`). Query DOM
  elements, validate with `if` checks, and throw descriptive errors if missing.
- **Explicit types**: Define types for state objects and function parameters.
  Use TypeScript's generic `querySelector<T>()` for DOM queries.
- **Use `textContent` over `innerHTML`**: When setting plain text, prefer
  `textContent` for safety and performance.
- **Formatting**: Tabs for indentation, double quotes for strings (enforced by
  Biome).

```typescript
// Good
const element = document.querySelector<HTMLDivElement>(".selector");
if (!element) {
 throw new Error("Element not found");
}

// Avoid
const element = document.querySelector<HTMLDivElement>(".selector")!;
```

### CSS

- **Custom properties**: Define shared values (colors, spacing, radii) in
  `:root`. Use `var(--name)` throughout.
- **Responsive design**: Use `clamp()` for fluid sizing. Use
  `@media (orientation: portrait/landscape)` for layout changes.
- **No unused properties**: Don't set properties that have no effect (e.g.,
  `font-size` on images).
- **Consistent selectors**: Match HTML structure. Use BEM-like naming (e.g.,
  `.menu-row`, `.menu-row--stack`).

### HTML

- **Semantic elements**: Use appropriate elements (`<h2>` for headings,
  `<button>` for actions, `<label>` for form inputs).
- **Accessibility**: Include `aria-label` on icon buttons, `role="dialog"` on
  modals, `aria-hidden` on decorative elements.
- **Valid markup**: All `<img>` elements must have `src` and `alt` attributes.
  Associate `<label>` elements with inputs via `for` attribute.

## Architecture Patterns

### State Management

App state is a simple object in `main.ts`. No external state library.

```typescript
type GameState = {
 lifePoints: number;
 p1: string;  // Player 1 color
 p2: string;  // Player 2 color
};
```

### Counter Module

The `setupCounter()` function returns an interface for external control:

```typescript
{
 getCount: () => number;
 setCount: (count: number) => void;
}
```

### Theming

Player colors are applied via CSS custom properties set as inline styles:

```typescript
element.style.setProperty("--player-color", color);
```

## Testing

No test framework is currently configured. Manual testing via `pnpm dev`.

## CI/CD

GitHub Actions workflow deploys to GitHub Pages on push to main. See
`.github/workflows/deploy.yaml`.
