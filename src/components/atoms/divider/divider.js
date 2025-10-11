import { processSlot } from '../../../utils/processSlot.js';

/**
 * @typedef {Object} dividerProps
 * @property {string} attrs - An attributes property
 * @property {string} cxs - Extra classes property
 * @returns {string} - Description of what the function returns
 */

/**
 * 
 * @param {dividerProps} props 
 * @returns {string}
 */

export const divider = ({attrs, cxs}) => {
 
    attrs = `  ${attrs}` ?? ``;
    cxs = ` ${cxs}` ?? '';

    return `<hr class="divider${cxs}"${attrs}/>`;
}