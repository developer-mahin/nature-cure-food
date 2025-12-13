# Dynamic Page Renderer

A flexible component system for rendering HTML, CSS, and JavaScript fetched from a database.

## Components

### 1. DynamicPageRenderer

**Location:** `src/components/dynamic/DynamicPageRenderer.jsx`

Renders dynamic content with three separate inputs:

- **HTML** - Page structure
- **CSS** - Styling
- **JavaScript** - Interactive functionality

### 2. ScriptExecutor

**Location:** `src/components/landing/ScriptExecutor.jsx`

Handles JavaScript execution from HTML content. Automatically extracts and executes `<script>` tags.

## Usage

### Example: Dummy Page

```jsx
// src/app/(mainlayout)/dummy/page.jsx
import DynamicPageRenderer from "@/components/dynamic/DynamicPageRenderer";
import { getDynamicPage } from "@/services/landing.service";

const Dummy = async ({ searchParams }) => {
  const slug = searchParams?.slug || "panagold-g-timex";
  const pageData = await getDynamicPage(slug);

  return (
    <DynamicPageRenderer
      html={pageData.data.html}
      css={pageData.data.css}
      js={pageData.data.js}
    />
  );
};
```

## Database Schema

Your API should return data in this format:

```json
{
  "data": {
    "html": "<div>...</div>",
    "css": "body { margin: 0; }",
    "js": "console.log('Hello');"
  }
}
```

## Supported Content Types

### 1. HTML

- **Full HTML documents** - Complete with `<!DOCTYPE>`, `<html>`, `<head>`, `<body>`
- **Partial HTML** - Just the body content
- **Inline scripts** - Scripts embedded in HTML are automatically executed

### 2. CSS

- **Inline styles** - Embedded in `<style>` tags
- **Raw CSS** - Plain CSS text

### 3. JavaScript

- **Inline scripts** - Extracted from HTML and executed
- **Separate JS** - Executed independently
- **DOM manipulation** - Full access to `document` API
- **Event listeners** - Properly attached and cleaned up

## Features

✅ **Automatic Script Execution** - Scripts run after DOM is ready  
✅ **CSS Injection** - Styles applied immediately  
✅ **Memory Leak Prevention** - Event listeners cleaned up on unmount  
✅ **Error Handling** - Console logging for debugging  
✅ **Full HTML Document Support** - Extracts body content automatically  
✅ **Timer Management** - setTimeout/setInterval properly handled

## Example Use Cases

1. **Landing Pages** - Dynamic product pages with animations
2. **Campaign Pages** - Marketing pages with custom JavaScript
3. **Promotional Pages** - Time-limited offers with countdown timers
4. **Product Pages** - Custom layouts with interactive elements

## API Endpoints

```
GET /landing/:slug
```

Response:

```json
{
  "data": {
    "html": "...",
    "css": "...",
    "js": "...",
    "title": "Page Title",
    "slug": "page-slug"
  }
}
```

## Testing

Visit `/dummy?slug=your-page-slug` to test your dynamic pages.

Example:

- `/dummy?slug=panagold-g-timex`
- `/dummy?slug=herbal-combo`

## Troubleshooting

### Scripts not executing?

1. Check browser console for errors
2. Verify `js` content is valid JavaScript
3. Ensure DOM elements exist before accessing them

### Styles not applying?

1. Check CSS syntax
2. Verify CSS is passed to component
3. Use browser DevTools to inspect applied styles

### HTML not rendering?

1. Verify HTML structure
2. Check for unclosed tags
3. Use React DevTools to inspect component state
