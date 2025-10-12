import { link } from './index.js';

const test = () => {
    const actual = link({url: 'https://example.com', slot: 'Example', cxs: 'custom-link', attrs: 'target="_blank" rel="noopener noreferrer"'});
    const expected = '<a href="https://example.com" class="link custom-link" target="_blank" rel="noopener noreferrer">Example</a>';
    return actual === expected? console.log(actual) || true : console.error({actual, expected}) || false;
};

test();