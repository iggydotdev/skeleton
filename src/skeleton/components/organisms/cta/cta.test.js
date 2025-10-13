import { cta } from './index.js';
import { text, link }from '../../atoms/index.js';


const test = () => {
    const actual = cta({
        slot:[
            text({is: 'p', slot: ['Text']}), 
            link({url: '#', slot:['ReadMore'] })
        ] 
    });
    const expected = '...';
    return actual === expected? console.log(actual) || true : console.error({actual, expected}) || false;
};

test();