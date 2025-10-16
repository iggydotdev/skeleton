import { normaliseClasses } from '../../../utils/normaliseClasses.js';
import { processSlot } from '../../../utils/processSlot.js';

/**

 * @property {string} attrs - An attributes property
 * @property {string} cxs - Extra classes property
 * @property {string | Array<string>} slot - string or array of strings property
 * @property {string} [is] - type of wrapping tag. Optional but default is div.
 * @returns {string} - Description of what the function returns
 */

export const box = ({is, attrs, cxs, slot}) => {
    is = is?? 'div';
    attrs = attrs? ` ${attrs}` : ``;
    const classes = normaliseClasses(`box ${cxs || ""}`);
    slot = processSlot(slot) ?? '';
    return `<${is} class="${classes}"${attrs}>${slot}</${is}>`;  
}