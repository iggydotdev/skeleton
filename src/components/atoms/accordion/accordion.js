import { processSlot } from '../../../utils/processSlot.js';

/**
 * @property {string} attrs - An attributes property
 * @property {string} cxs - Extra classes property
 * @property {string | Array<string>} titleSlot - string or array of strings property
 * @property {string | Array<string>} detailsSlot - string or array of strings property
 * @returns {string} - Description of what the function returns
 */

export const accordion = ({attrs, cxs, titleSlot, detailsSlot}) => {
    attrs = attrs? ` ${attrs}` : ``;
    cxs = cxs? ` ${cxs}` : '';
    titleSlot = processSlot(titleSlot) ?? '';
    detailsSlot = processSlot(detailsSlot) ?? '';
    return `<details class="accordion${cxs}"${attrs}><summary>${titleSlot}</summary>${detailsSlot}</details>`;
}