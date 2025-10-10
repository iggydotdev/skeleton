import { processSlot } from '../../../utils/processSlot.js';

/**
 * @typedef {Object} componentNameProps
 * @property {string} attrs - An attributes property
 * @property {string} cxs - Extra classes property
 * @property {string | Array<string>} slot - string or array of strings property
 * @returns {string} - Description of what the function returns
 */

/**
 * 
 * @param {componentNameProps} props 
 * @returns {string}
 */

export const componentName = (props) => {
    const {
        attrs = attrs ?? ``, 
        cxs = cxs ?? '',
        slot = processSlot(slot) ?? '',
    } = props;

    return `<div class='generic${cxs}'${attrs}>${slot}</div>`;
}