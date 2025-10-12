import { processSlot } from '../../../../utils/processSlot.js';

/**
 * @typedef {Object} linkProps
 * @property {string} url - The URL the link points to
 * @property {string} attrs - An attributes property
 * @property {string} cxs - Extra classes property
 * @property {string | Array<string>} slot - string or array of strings property
 * @returns {string} - Description of what the function returns
 */

/**
 * 
 * @param {linkProps} props 
 * @returns {string}
 */

export const link = ({url, attrs, cxs, slot}) => {
    attrs = attrs? ` ${attrs}` : ``;
    cxs = cxs? ` ${cxs}` : '';
    slot = processSlot(slot) ?? '';
    return `<a href="${url}" class="link${cxs}"${attrs}>${slot}</a>`;
}