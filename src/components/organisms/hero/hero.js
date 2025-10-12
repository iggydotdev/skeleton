import { processSlot } from '../../../utils/processSlot.js';
import { box } from '../../atoms/index.js';

/**
 * @typedef {Object} heroProps
 * @property {string} attrs - An attributes property
 * @property {string} cxs - Extra classes property
 * @property {string | Array<string>} slot - string or array of strings property
 * @returns {string} - Description of what the function returns
 */

/**
 * 
 * @param {heroProps} props 
 * @returns {string}
 */

export const hero = ({attrs, cxs, slot}) => {
    
    attrs = attrs? ` ${attrs}` : ``;
    cxs = cxs? ` ${cxs}` : '';
    slot = processSlot(slot) ?? '';
    
    return box({
        attrs: ` role="hero"${attrs}`,
        cxs: ` hero${cxs}`,
        slot: slot
    });
}