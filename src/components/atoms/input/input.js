import { processSlot } from '../../../utils/processSlot.js';

/**
 * @typedef {Object} inputProps
 * @property {string} attrs - An attributes property
 * @property {string} cxs - Extra classes property
 * @property {string | Array<string>} slot - string or array of strings property
 * @returns {string} - Description of what the function returns
 */

/**
 * 
 * @param {inputProps} props 
 * @returns {string}
 */

export const input = ({ type, cxs, attrs }) => {
    attrs = attrs? ` ${attrs}` : ``; 
    cxs = cxs? ` ${cxs}` : '';

    return `<input type="${type}" class="input${cxs}"${attrs}/>`;
}