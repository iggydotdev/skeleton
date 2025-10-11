import { source } from '../source/source.js';
import { picture } from './index.js';

const test = () => {
    const actual = picture({ attrs: 'id="picture-element"', cxs: 'custom-picture', slot: [source({ type: 'image', src: 'image.jpg', attrs: 'id="image-source"', cxs: 'custom-image' }), '...slot content goes here...'] });
    const expected = '<picture class="picture custom-picture" id="picture-element"><source src="image.jpg" class="img-src custom-image" id="image-source"/>...slot content goes here...</picture>';
    return actual === expected? console.log(actual) || true : console.error({actual, expected}) || false;
};

test();