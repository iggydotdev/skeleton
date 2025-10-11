import { processSlot } from '../../../utils/processSlot.js';

/**
 * @typedef {Object} sourceProps
 * @property {string} type - Type of source, either 'image' or 'video'
 * @property {string} [srcset] - The source set URL of the video (for video type)
 * @property {string} [src] - The source URL of the image (for image type)
 * @property {string} attrs - An attributes property
 * @property {string} cxs - Extra classes property
 * @returns {string} - Description of what the function returns
 */

/**
 * 
 * @param {sourceProps} props 
 * @returns {string}
 */

export const source = ({type, attrs, cxs, srcset, src}) => {
    
    attrs = ` ${attrs}` ?? ``;
    cxs = ` ${cxs}` ?? '';

    if (type === 'video') {
        return `<source srcset="${srcset}" class="video-src${cxs}"${attrs}/>`;
    }
    
    return `<source src="${src}" class="img-src${cxs}"${attrs}/>`;
}