import { box } from '../../atoms/index.js';
import { processSlot } from '../../../utils/processSlot.js';

/**
 * @typedef {Object} cardProps
 * @property {string} attrs - An attributes property
 * @property {string} cxs - Extra classes property
 * @property {string | Array<string>} slot - string or array of strings property
 * @property {string | Array<string>} [headerSlot] - string or array of strings property
 * @property {string | Array<string>} [mediaSlot] - string or array of strings property
 * @property {string | Array<string>} [linkSlot] - string or array of strings property
 * @property {string | Array<string>} [contentSlot] - string or array of strings property
 * @returns {string} - Description of what the function returns
 */

/**
 * 
 * @param {cardProps} props 
 * @returns {string}
 */

export const card = ({attrs, cxs, slot, headerSlot, mediaSlot, linkSlot, contentSlot}) => {
    
    attrs = ` ${attrs}` ?? ``;
    cxs = ` ${cxs}` ?? '';
    slot = processSlot(slot) ?? '';
    
    headerSlot = processSlot(headerSlot) ?? '';
    mediaSlot = processSlot(mediaSlot) ?? '';
    linkSlot = processSlot(linkSlot) ?? '';
    contentSlot = processSlot(contentSlot) ?? '';
    

    // 
    // box
    //  slot (CUSTOM)
    //  OR
    //  headerSlot
    //  mediaSlot
    //  link
    //  contentSlot

    const custom = slot !== ''? true : false;
    if (!custom) {
        slot = `${headerSlot}${mediaSlot}${linkSlot}${contentSlot}`;
    }

    return box({
        type: 'div',
        cxs: ` card${cxs}`,
        attrs: attrs,
        slot: slot
    });
}