# Skeleton Documentation

## Table of Contents
1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Core Concepts](#core-concepts)
4. [Component System](#component-system)
5. [Server Features](#server-features)
6. [Development Tools](#development-tools)
7. [Testing](#testing)
8. [Examples](#examples)

## Overview

Skeleton is a zero-dependency JavaScript framework for building composable server-side rendered applications. It follows atomic design principles and emphasizes simplicity through pure functions.

### Key Features
- 🧩 **Component-First**: Build UIs through function composition
- 📦 **Zero Dependencies**: Pure JavaScript, no npm needed
- 🚀 **SSR & SSG**: Server-side rendering and static generation
- 🧪 **Built-in Testing**: Integrated test runner
- 🎯 **TypeSafe**: Optional JSDoc types

## Getting Started

### Prerequisites
- Node.js v18+
- Git (optional)

### Quick Start

```bash
# Clone repository
git clone https://github.com/yourusername/skeleton.git
cd skeleton

# Start development server
node src/flesh/index.js

# Visit http://localhost:3000
```

### Project Structure

```text
skeleton/
├── src/
│   ├── skeleton/          # Component Library
│   │   ├── components/    # Atomic components
│   │   └── utils/        # Utilities & tools
│   └── flesh/            # Framework
│       ├── compose.js    # Component engine
│       └── router.js     # URL routing
```

## Core Concepts

### Components as Pure Functions

Components are pure JavaScript functions that return HTML strings:

```javascript
// Example atom component
export const button = ({attrs, className, slot}) => {
    attrs = attrs ? ` ${attrs}` : '';
    className = className ? ` ${className}` : '';
    return `<button class="btn${className}"${attrs}>${slot}</button>`;
}
```

### Component Properties

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `attrs` | string | HTML attributes | `'id="submit" data-test="true"'` |
| `className` | string | CSS classes | `'primary large'` |
| `slot` | string\|array | Content or children | `'Click me'` or `[{type: 'atom'...}]` |

### Composition Objects

Components can be composed using plain objects:

```javascript
const buttonComponent = {
    type: 'atom',
    name: 'button',
    props: {
        slot: 'Submit',
        className: 'primary',
        attrs: 'type="submit"'
    }
}
```

## Component System

### Creating Components

Use the built-in generator:

```bash
# Generate new component
node src/skeleton/utils/generator/index.js atom my-button
```

Generated files:
- `index.js` - Exports
- `my-button.js` - Implementation
- `my-button.test.js` - Tests

### Component Types

#### Atoms
Basic building blocks:

```javascript
export const button = ({attrs, className, slot}) => `
    <button class="btn${className}"${attrs}>${slot}</button>
`;
```

#### Molecules
Combinations of atoms:

```javascript
export const card = ({headerSlot, contentSlot, footerSlot, className}) => `
    <div class="card${className}">
        <div class="card-header">${headerSlot}</div>
        <div class="card-content">${contentSlot}</div>
        <div class="card-footer">${footerSlot}</div>
    </div>
`;
```

#### Organisms
Complex UI sections:

```javascript
export const header = ({slot, className}) => `
    <header class="header${className}">
        <nav class="nav">${slot}</nav>
    </header>
`;
```

## Server Features

### Server-Side Rendering

```javascript
import { renderPage } from './renderPage.js';
import { router } from './router.js';

const server = createServer(async (req, res) => {
    const route = await router(req.url);
    const html = renderPage(route.content, route.meta);
    res.end(html);
});
```

### Static Site Generation

```bash
# Generate static site
node src/flesh/utils/build/index.js public

# Output structure:
public/
├── index.html
├── about/
│   └── index.html
└── blog/
    └── post-1/
        └── index.html
```

## Development Tools

### Development Server

```bash
# Start dev server with hot reload
node src/flesh/dev-server.js
```

### Component Generator

```bash
# Generate new component
node src/skeleton/utils/generator/index.js <type> <name>

# Types: atom, molecule, organism
# Example:
node src/skeleton/utils/generator/index.js molecule card
```

## Testing

### Running Tests

```bash
# Run all tests
node src/skeleton/utils/tester.js

# Run specific component tests
node src/skeleton/utils/tester.js button
```

### Writing Tests

```javascript
export const test = () => {
    const actual = button({
        slot: 'Click me',
        className: 'primary'
    });
    const expected = '<button class="btn primary">Click me</button>';
    
    return actual === expected;
};
```

## Examples

### Basic Page

```javascript
export const components = [{
    type: 'organism',
    name: 'header',
    props: {
        slot: [{
            type: 'atom',
            name: 'link',
            props: {
                url: '/',
                slot: 'Home'
            }
        }]
    }
}, {
    type: 'organism',
    name: 'hero',
    props: {
        slot: [{
            type: 'atom',
            name: 'text',
            props: {
                is: 'h1',
                slot: 'Welcome to Skeleton'
            }
        }]
    }
}];
```