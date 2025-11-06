# CodeWindow Component

A beautiful, Vercel-style macOS window component for displaying syntax-highlighted code in Remotion videos. Features a thin border, macOS-style dots, and full theme support via shadcn/ui.

## Features

- 🎨 Syntax highlighting powered by [sugar-high](https://github.com/huozhi/sugar-high)
- 🌓 Full dark/light mode support via shadcn themes
- 💻 macOS-style window with dots
- 🔢 Optional line numbers
- 🎯 Fully typed with TypeScript
- 🎬 Optimized for Remotion videos (static rendering)

## Installation

The component requires these dependencies (already included):

```bash
pnpm add sugar-high
```

## Usage

### Basic Example

```tsx
import { CodeWindow } from "@/components/ui/code-window";

export function Example() {
  const code = `function hello() {
  console.log("Hello, World!");
}`;

  return <CodeWindow code={code} filename="example.js" />;
}
```

### With Line Numbers

```tsx
<CodeWindow
  code={code}
  filename="example.ts"
  showLineNumbers
/>
```

### Custom Title

```tsx
<CodeWindow
  code={code}
  title="My Custom Title"
/>
```

### Without macOS Dots

```tsx
<CodeWindow
  code={code}
  showDots={false}
/>
```

### Minimal (No Header Items)

```tsx
<CodeWindow
  code={code}
  showDots={false}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `code` | `string` | Required | The code to display |
| `language` | `string` | `undefined` | Programming language (for future use) |
| `filename` | `string` | `undefined` | Filename to display in header |
| `title` | `string` | `undefined` | Custom title (alternative to filename) |
| `showDots` | `boolean` | `true` | Show macOS-style dots |
| `showLineNumbers` | `boolean` | `false` | Display line numbers |
| `className` | `string` | `undefined` | Additional CSS classes |

## Theming

The component uses shadcn/ui CSS variables for theming. It automatically adapts to your light/dark theme settings.

### Syntax Highlighting Colors

The syntax highlighting colors are defined in your `src/index.css` file and automatically adapt to your theme. The colors use OKLCH for consistent color perception across themes.

### Customizing Colors

You can customize the syntax highlighting colors by modifying the `.sh__*` classes in your CSS:

```css
.sh__keyword {
  color: oklch(0.6 0.19 295); /* Purple for keywords */
}

.sh__string {
  color: oklch(0.65 0.15 150); /* Green for strings */
}

/* Add dark mode variants */
.dark .sh__keyword {
  color: oklch(0.75 0.19 295);
}
```

## Styling

The component uses Tailwind CSS and shadcn/ui theme variables. You can customize the appearance by:

1. Passing a `className` prop
2. Modifying the theme variables in your CSS
3. Adjusting the syntax highlighting colors

### Example Custom Styling

```tsx
<CodeWindow
  code={code}
  filename="example.ts"
  className="shadow-lg border-2"
/>
```

## Accessibility

- Line numbers are marked as non-selectable for cleaner text selection
- Semantic HTML structure
- Proper contrast ratios for syntax highlighting

## Browser Support

Works in all modern browsers that support:
- CSS Custom Properties
- ES6+

## Credits

- Syntax highlighting: [sugar-high](https://github.com/huozhi/sugar-high)
- Design inspiration: [Vercel](https://vercel.com)
- Built for: [Remotion](https://www.remotion.dev/)
