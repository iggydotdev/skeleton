import { box } from './index.js';

const test = () => {
    const actual = box({slot: 'Content', cxs: ' customClass', attrs: ''});
    const expected = '<div class="box customClass">Content</div>';
    return actual === expected? console.log(actual) || true : console.error({actual, expected}) || false;
};

console.log(test());