import { processSlot } from '../../../utils/processSlot.js';

/**
 * @property {string} [src] - The source URL of the video
 * @property {string} attrs - An attributes property
 * @property {string} cxs - Extra classes property
 * @property {string | Array<string>} slot - string or array of strings property
 * @returns {string} - Description of what the function returns
 */


export const video = ({src, attrs, cxs, slot}) => {
    src = src? ` ${src}`:``;
    attrs = attrs? ` ${attrs}` : ``;
    cxs = cxs? ` ${cxs}` : '';
    slot = processSlot(slot) ?? '';    
    return `<video${src} class="video${cxs}"${attrs}>${slot}</video>`;
}