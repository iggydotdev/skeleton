# Skeleton - Component Library & Framework

Skeleton is a lightweight, composition-first component library and SSR/SSG framework built with pure JavaScript and no dependencies.

## Features

- 🧩 **Atomic Design System** - Well-organized component hierarchy (atoms → molecules → organisms)
- 🎯 **Pure JavaScript** - No TypeScript, no frameworks. Just functions and JSDoc
- 📦 **Zero Dependencies** - No npm packages required
- 🚀 **Server-Side Rendering** - Built-in SSR support with Node.js
- 🔄 **Static Generation** - Generate static HTML files
- 🧪 **Auto-Testing** - Built-in test discovery and runner
- 🎨 **Composition** - Nested components work seamlessly

## Project Structure

```
skeleton/
├── src/
│   ├── skeleton/          # Component Library
│   │   ├── components/
│   │   │   ├── atoms/     # Basic elements (button, link, text, etc)
│   │   │   ├── molecules/ # Combinations (card, form-group, etc)
│   │   │   └── organisms/ # Sections (header, footer, hero, etc)
│   │   └── utils/
│   └── flesh/             # Framework
│       ├── compose.js     # Component composition engine
│       ├── router.js      # URL routing
│       ├── routes.js      # Route definitions
│       └── pages/         # Page templates
└── src/build/
    └── ssg.js            # Static site generation
```

## Installation

```bash
git clone https://github.com/iggydotdev/skeleton.git
cd skeleton
```

No npm install needed! Everything runs with Node.js (v24).

## Quick Start

### 1. Run Development Server (SSR)

```bash
node src/flesh/index.js
```

Visit `http://localhost:3000`

### 2. Build Static Site (SSG) - COMING SOON!

```bash
node src/build/ssg-cli.js public
```

Generates HTML files in `public/` directory.

### 3. Run Tests

```bash
node src/skeleton/utils/tester.js
```

Auto-discovers and runs all `.test.js` files.

## Creating Components

### Atoms (Basic Elements)

```javascript
// src/skeleton/components/atoms/button/button.js
import { processSlot } from '../../../utils/processSlot.js';

export const button = ({ type = 'button', attrs, cxs, slot }) => {
    attrs = attrs? ` ${attrs}` : '';
    cxs = cxs? ` ${cxs}` : '';
    slot = processSlot(slot) ?? '';
    return `<button type="${type}" class="btn${cxs}"${attrs}>${slot}</button>`;
}
```

### Using Components

```javascript
// Standalone
button({ type: 'submit', slot: 'Click Me', cxs: 'primary' });

// In composition
{
    type: 'atom',
    name: 'button',
    props: {
        type: 'submit',
        slot: 'Submit',
        cxs: 'primary'
    }
}
```

### Component Props API

All components support:
- **attrs** - Raw HTML attributes (string)
- **cxs** - CSS classes (string)
- **slot** - Content (string or array of components)

Some components have additional props:
- **text**: `is` (HTML tag)
- **button**: `type` (submit, reset, button)
- **link**: `url` (href)
- **image**: `src` (image source)

## Routing & Pages

### Define Routes

```javascript
// src/flesh/routes.js
export const routes = [{
    name: 'Home',
    pattern: new URLPattern({ pathname: '/' }),
    meta: { title: 'Home' },
    components: homeComponents
}];
```

### Create Page Components

```javascript
// src/flesh/pages/home.js
export const components = [
    {
        type: 'organism',
        name: 'header',
        props: { slot: [...] }
    },
    {
        type: 'organism',
        name: 'hero',
        props: { slot: [...] }
    }
];
```

## Composition System

Components are composed recursively:

```javascript
const components = [
    {
        type: 'organism',
        name: 'card',
        props: {
            slot: [
                {
                    type: 'atom',
                    name: 'text',
                    props: {
                        is: 'h2',
                        slot: 'Title'
                    }
                },
                {
                    type: 'atom',
                    name: 'text',
                    props: {
                        is: 'p',
                        slot: 'Description'
                    }
                }
            ]
        }
    }
];

const html = compose(components);
```

## Component Testing

Tests are auto-discovered and run:

```javascript
// src/skeleton/components/atoms/button/button.test.js
export const test = () => {
    const actual = button({ type: 'submit', slot: 'Click' });
    const expected = '<button type="submit" class="btn">Click</button>';
    return actual === expected? true : console.error({actual, expected}) || false;
};
```

Run all tests:
```bash
node src/skeleton/utils/tester.js
```

## API Reference

### Core Components

#### Atoms
- **button** - `{ type, slot, cxs, attrs }`
- **link** - `{ url, slot, cxs, attrs }`
- **text** - `{ is, slot, cxs, attrs }`
- **image** - `{ src, cxs, attrs }`
- **input** - `{ type, cxs, attrs }`
- **textarea** - `{ cxs, attrs }`
- **box** - `{ is, slot, cxs, attrs }`
- **accordion** - `{ titleSlot, detailsSlot, cxs, attrs }`
- **divider** - `{ cxs, attrs }`
- **video** - `{ src, slot, cxs, attrs }`
- **picture** - `{ slot, cxs, attrs }`

#### Molecules
- **card** - `{ slot, headerSlot, mediaSlot, linkSlot, contentSlot, cxs, attrs }`

#### Organisms
- **header** - `{ slot, cxs, attrs }`
- **footer** - `{ slot, cxs, attrs }`
- **hero** - `{ slot, cxs, attrs }`
- **cta** - `{ slot, cxs, attrs }`

### Functions

#### compose(components)
Recursively composes component tree into HTML.

```javascript
const html = compose([
    { type: 'atom', name: 'text', props: { is: 'p', slot: 'Hello' } }
]);
// Returns: '<p class="text">Hello</p>'
```

#### renderPage(content, meta)
Wraps composed HTML in full page template.

```javascript
const html = renderPage(content, { title: 'My Page' });
```

#### router(url, routes)
Matches URL to route and returns route info.

```javascript
const route = router(new URL('http://localhost/'), routes);
// Returns: { params, query, meta, components, ... }
```

## Advanced Usage

### Custom Styling

Since there's no CSS, add styles via attrs:

```javascript
button({
    slot: 'Styled Button',
    attrs: 'style="background: blue; color: white; padding: 10px;"'
})
```

Or include a global stylesheet:

```javascript
// In renderPage, add to <head>
<link rel="stylesheet" href="/styles.css">
```

### Conditional Rendering

Use JavaScript to conditionally build components:

```javascript
const components = [
    showHeader && {
        type: 'organism',
        name: 'header',
        props: { slot: [...] }
    },
    {
        type: 'atom',
        name: 'text',
        props: { is: 'p', slot: content }
    }
].filter(Boolean); // Remove falsy values

const html = compose(components);
```

## Roadmap

- [ ] Client-side interactivity (tabs, modals, etc)
- [ ] ISR (Incremental Static Regeneration)
- [ ] Plugin system
- [ ] Middleware support
- [ ] CLI tool with scaffolding
- [ ] Develop a component viewer (storybook-like) integration

## License

MIT - See LICENSE file

## Contributing

Contributions welcome! Please ensure:
- All tests pass: `node src/skeleton/utils/tester.js`
- New components follow the pattern
- JSDoc comments included
