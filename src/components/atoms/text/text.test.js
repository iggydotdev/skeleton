import { text } from './index.js';

const test = () => {
    const actual = text({ /* props go here */  });
    const expected = '...expected value goes here...';
    return actual === expected
};

test();