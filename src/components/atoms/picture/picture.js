import { processSlot } from '../../../utils/processSlot.js';

/**
 * @typedef {Object} pictureProps
 * @property {string} attrs - An attributes property
 * @property {string} cxs - Extra classes property
 * @property {string | Array<string>} slot - string or array of strings property
 * @returns {string} - Description of what the function returns
 */

/**
 * 
 * @param {pictureProps} props 
 * @returns {string}
 */

export const picture = ({attrs, cxs, slot}) => {
    
    attrs = attrs? ` ${attrs}` : ``;
    cxs = cxs? ` ${cxs}` : '';
    slot = processSlot(slot) ?? '';
    
    return `<picture class="picture${cxs}"${attrs}>${slot}</picture>`;
}