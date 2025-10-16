import { box } from './index.js';

export const test = () => {
    const actual = box({slot: 'Content', cxs: 'customClass'});
    const expected = '<div class="box customClass">Content</div>';
    return actual === expected? true : console.error({actual, expected}) || false;
};

;