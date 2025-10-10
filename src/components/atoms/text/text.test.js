import { text } from './index.js';

const test = () => {
    const actual = text({is: 'p', slot: 'Hello, World!', cxs: ' custom-text', attrs: ' id="greeting"'});
    const expected = `<p class="text custom-text" id="greeting">Hello, World!</p>`;
    return actual === expected? console.log(actual) || true : console.error({actual, expected}) || false;
};

console.log(test());