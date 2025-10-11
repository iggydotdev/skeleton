import { textarea } from './index.js';

const test = () => {
    const actual = textarea({ attrs: 'placeholder="Enter text" id="text-area"', cxs: 'custom-textarea' });
    const expected = '<textarea class="textarea custom-textarea" placeholder="Enter text" id="text-area"/>';
    return actual === expected? console.log(actual) || true : console.error({actual, expected}) || false;
};

test();