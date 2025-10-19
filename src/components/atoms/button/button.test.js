import { button } from './index.js';

export const test = () => {
    const actual = button({type: 'submit', slot: 'Click Me', className: 'custom-button', attrs: 'id="my-button" onclick="()=>{alert(`hello`)}"'});
    const expected = '<button type="submit" class="btn custom-button" id="my-button" onclick="()=>{alert(`hello`)}">Click Me</button>';
    return actual === expected? true : console.error({actual, expected}) || false;
};