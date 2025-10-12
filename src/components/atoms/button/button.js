import { processSlot } from '../../../utils/processSlot.js';

/**
 * @typedef {Object} buttonProps
 * @property {string} type - The button type, e.g., 'button', 'submit', 'reset'
 * @property {string} attrs - An attributes property
 * @property {string} cxs - Extra classes property
 * @property {string | Array<string>} slot - string or array of strings property
 * @returns {string} - Description of what the function returns
 */

/**
 * 
 * @param {buttonProps} props 
 * @returns {string}
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