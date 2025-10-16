import { processSlot } from '../../../utils/processSlot.js';

/**
 * @property {string} type - The button type, e.g., 'button', 'submit', 'reset'
 * @property {string} attrs - An attributes property
 * @property {string} cxs - Extra classes property
 * @property {string | Array<string>} slot - string or array of strings property
 * @returns {string} - Description of what the function returns
 */

export const button = ({
        type = 'button',
        attrs, 
        cxs,
        slot
    }) => {
    attrs = attrs? ` ${attrs}` : ``;
    cxs = cxs? ` ${cxs}` : '';
    slot = processSlot(slot) ?? '';
    return `<button type="${type}" class="btn${cxs}"${attrs}>${slot}</button>`;
}