import { image } from './index.js';

const test = () => { 
    const actual = image({src: 'https://picsum.photos/200/300', attrs: 'alt="Example Image" id="example-image"', cxs: 'custom-image'});
    const expected = '<img src="https://picsum.photos/200/300" class="image custom-image" alt="Example Image" id="example-image"/>';
    return actual === expected? console.log(actual) || true : console.error({actual, expected}) || false;
};

test();