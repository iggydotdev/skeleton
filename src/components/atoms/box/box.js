import { processSlot } from '../../../utils/processSlot.js';

/**
 * @property {string} attrs - An attributes property
 * @property {string} cxs - Extra classes property
 * @property {string | Array<string>} slot - string or array of strings property
 * @returns {string} - Description of what the function returns
 */

export const box = ({attrs, cxs, slot}) => {
    attrs = attrs? ` ${attrs}` : ``;
    cxs = cxs? ` ${cxs}` : '';
    slot = processSlot(slot) ?? '';
    return `<div class="box${cxs}"${attrs}>${slot}</div>`;
}