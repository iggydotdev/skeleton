import { box } from './index.js';

const test = () => {
    const actual = box({ /* props go here */  });
    const expected = '...expected value goes here...';
    return actual === expected
};

test();