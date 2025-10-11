import { componentName } from './index.js';

const test = () => {
    const actual = componentName({ /* props go here */  });
    const expected = '...expected value goes here...';
    return actual === expected? console.log(actual) || true : console.error({actual, expected}) || false;
};

test();