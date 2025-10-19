import { image } from './index.js';

export const test = () => { 
    const actual = image({src: 'https://picsum.photos/200/300', attrs: 'alt="Example Image" id="example-image"', className: 'custom-image'});
    const expected = '<img src="https://picsum.photos/200/300" class="image custom-image" alt="Example Image" id="example-image"/>';
    return actual === expected? true : console.error({actual, expected}) || false;
};
