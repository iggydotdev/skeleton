import { processSlot } from '../../../utils/processSlot.js';

/**
 * @property {string} is - The HTML tag to use, e.g., 'p', 'span', 'h1'
 * @property {string} attrs - An attributes property
 * @property {string} cxs - Extra classes property
 * @property {string | Array<string>} slot - string or array of strings property
 * @returns {string} - Description of what the function returns
 */

export const text = ({is, attrs, cxs, slot}) => {
    attrs = attrs? ` ${attrs}` : ``;
    cxs = cxs? ` ${cxs}` : '';
    slot = processSlot(slot) ?? '';
    return `<${is} class="text${cxs}"${attrs}>${slot}</${is}>`;
}