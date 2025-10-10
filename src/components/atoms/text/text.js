import { processSlot } from '../../../utils/processSlot.js';

/**
 * @typedef {Object} textProps
 * @property {string} is - The HTML tag to use, e.g., 'p', 'span', 'h1'
 * @property {string} attrs - An attributes property
 * @property {string} cxs - Extra classes property
 * @property {string | Array<string>} slot - string or array of strings property
 * @returns {string} - Description of what the function returns
 */

/**
 * 
 * @param {textProps} props 
 * @returns {string}
 */

export const text = (props) => {
    const {
        is,
        attrs = ` ${attrs}` ?? ``, 
        cxs = ` ${cxs}` ?? '',
        slot = processSlot(slot) ?? '',
    } = props;

    return `<${is} class="text${cxs}"${attrs}>${slot}</${is}>`;
}