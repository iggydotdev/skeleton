import { input } from './index.js';

const test = () => {
    const actual = input({type: 'text', attrs: 'placeholder="Enter text" id="text-input"', cxs: 'custom-input'});
    const expected = '<input type="text" class="input custom-input" placeholder="Enter text" id="text-input"/>';
    return actual === expected? console.log(actual) || true : console.error({actual, expected}) || false;
};

test();