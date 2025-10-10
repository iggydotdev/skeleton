import { textarea } from './index.js';

const test = () => {
    const actual = textarea({ /* props go here */  });
    const expected = '...expected value goes here...';
    return actual === expected
};

test();