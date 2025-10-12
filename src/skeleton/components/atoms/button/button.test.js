import { button } from './index.js';

const test = () => {
    const actual = button({type: 'submit', slot: 'Click Me', cxs: 'custom-button', attrs: 'id="my-button" onclick="()=>{alert(`hello`)}"'});
    const expected = '<button type="submit" class="btn custom-button" id="my-button" onclick="()=>{alert(`hello`)}">Click Me</button>';
    return actual === expected? console.log(actual) || true : console.error({actual, expected}) || false;
};

test();