import { footer } from './index.js';

const test = () => {
    const actual = footer({ attrs: 'data-test="footer"', cxs: 'custom-footer', slot: '<p class="footer-text">This is the footer</p>' });
    const expected = '<footer class="footer custom-footer" data-test="footer"><p class="footer-text">This is the footer</p></footer>';
    return actual === expected? console.log(actual) || true : console.error({actual, expected}) || false;
};

test();