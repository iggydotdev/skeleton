import { processSlot } from '../../utils/processSlot.js';
import { validateProps } from '../../utils/validateProps.js';

/**
 * Accordion component - Out of the box default accordion (details+summary elements)
 *
 * Renders an HTML details + summary elements with customizable styling, content and attrs 
 * @param {Object} props
 * @property {string} props.attrs - Additional HMTL attributes 
 * @property {string} props.className - Additional CSS classes to apply
 * @property {string | Array<string>} titleSlot - Title content. Could be a string or array of strings property
 * @property {string | Array<string>} detailsSlot - Details content. Could be a string or array of strings property
 * 
 * @returns {string} - Description of what the function returns
 * 
 * @throws {ComponentError} If required props are missing or invalidd types provided
 * 
 * @example
 * // Basic Accordion 
 * 
 * Returns: '<details><summary>Title</summary> Content </details>'
 * 
*/



export const accordion = ({attrs, className, titleSlot, detailsSlot}) => {

    validateProps({ slot }, [slot], {componentName: 'accordion', componentType: 'atom'})
    validatePropsTypes(
        {attrs,className, titleSlot, details}, 
        [{attrs: 'string', className: 'string', titleSlot: 'string', detailsSlot: 'string'}], 
        {componentName: 'accordion', componentType: 'atom'})
                                                                                                                                                                                                                           
    const escapeAttrs = attrs? ` ${escapeAttrs(attrs)}` : ``;
    const classes =  normalizeClasses(['accordion', className]);
    titleSlot = processSlot(titleSlot);
    detailsSlot = processSlot(detailsSlot);
    return `<details class="${classes}"${escapeAttrs}><summary>${titleSlot}</summary>${detailsSlot}</details>`;
}