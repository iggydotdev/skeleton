import { processSlot } from '../../../utils/processSlot.js';

/**
 * @typedef {Object} accordionProps
 * @property {string} attrs - An attributes property
 * @property {string} cxs - Extra classes property
 * @property {string | Array<string>} titleSlot - string or array of strings property
 * @property {string | Array<string>} detailsSlot - string or array of strings property
 * @returns {string} - Description of what the function returns
 */

/**
 * 
 * @param {accordionProps} props 
 * @returns {string}
 */

export const accordion = (props) => {
    const {
        attrs = attrs ?? ``, 
        cxs = cxs ?? '',
        titleSlot = processSlot(titleSlot) ?? '',
        detailsSlot = processSlot(detailsSlot) ?? '',
    } = props;

    return `<details class="accordion${cxs}"${attrs}><summary>${titleSlot}</summary>${detailsSlot}</details>`;
}