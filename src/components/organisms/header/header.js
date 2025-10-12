import { processSlot } from '../../../utils/processSlot.js';

/**
 * @typedef {Object} headerProps
 * @property {string} attrs - An attributes property
 * @property {string} cxs - Extra classes property
 * @property {string | Array<string>} slot - string or array of strings property
 * @returns {string} - Description of what the function returns
 */

/**
 * 
 * @param {headerProps} props 
 * @returns {string}
 */

export const header = ({attrs, cxs, slot}) => {
    
    attrs = attrs? ` ${attrs}` : ``;
    cxs = cxs? ` ${cxs}` : '';
    slot = processSlot(slot) ?? '';
    
    return `<header class="header${cxs}"${attrs}>${slot}</header>`;
}