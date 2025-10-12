import { processSlot } from '../../../utils/processSlot.js';

/**
 * @typedef {Object} imageProps
 * @property {string} src - The source URL of the image
 * @property {string} attrs - An attributes property
 * @property {string} cxs - Extra classes property
 * @returns {string} - Description of what the function returns
 */

/**
 * 
 * @param {imageProps} props 
 * @returns {string}
 */

export const image = ({src, attrs, cxs, slot}) => {;
    attrs = attrs? ` ${attrs}` : ``;
    cxs = cxs? ` ${cxs}` : '';
    
    return `<img src="${src}" class="image${cxs}"${attrs}/>`;
}   