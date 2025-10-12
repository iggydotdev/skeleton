import { hero } from './index.js';
import { text } from '../../atoms/index.js';

const test = () => {
    const actual = hero({ attrs: 'data-test="hero"', cxs: 'custom-hero', slot: [text({is: 'h1', cxs:" hero-title", slot: 'This is the hero section', attrs: '' })]});
    const expected = '<div class="box hero custom-hero" role="hero" data-test="hero"><h1 class="text hero-title">This is the hero section</h1></div>';
    return actual === expected? console.log(actual) || true : console.error({actual, expected}) || false;
};

test();