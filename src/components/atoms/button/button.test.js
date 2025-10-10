import { button } from './index.js';

const test = () => {
    const actual = button({ /* props go here */  });
    const expected = '...expected value goes here...';
    return actual === expected
};

test();