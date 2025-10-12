import { cta } from './index.js';

const test = () => {
    const actual = cta({ /* props go here */  });
    const expected = '...expected value goes here...';
    return actual === expected? console.log(actual) || true : console.error({actual, expected}) || false;
};

test();