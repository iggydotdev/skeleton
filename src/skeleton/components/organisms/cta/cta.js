import { processSlot } from '../../../../utils/processSlot.js';
import { box } from '../../atoms/index.js';

/**
 * @typedef {Object} ctaProps
 * @property {string} attrs - An attributes property
 * @property {string} cxs - Extra classes property
 * @property {string | Array<string>} slot - string or array of strings property
 * @returns {string} - Description of what the function returns
 */

export const cta = ({attrs, cxs, slot}) => { 
    attrs = attrs? ` ${attrs}` : ``;
    cxs = cxs? ` ${cxs}` : '';
    slot = processSlot(slot) ?? '';
    return box({attrs: `role="cta"${attrs}`, cxs: `cta${cxs}`, slot}); // Example: <box role="cta" class="box cta custom-classes">...</box>`;
}