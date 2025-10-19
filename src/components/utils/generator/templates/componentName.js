import { processSlotTrusted } from '../../utils/processSlot.js';
import { normalizeClasses } from '../../utils/normalizeClasses.js';
import { validateProps, validatePropTypes } from '../../utils/componentError.js';
import { escapeAttr } from '../../utils/escapeAttr.js';

/**
 * componentName component - An element
 * 
 * Renders an HTML button element with customizable type, styling, and content.
 * Automatically handles prop validation, HTML escaping, and class normalization.
 * 
 * @param {Object} props - Component properties
 * @param {string} [props.attrs=''] - Additional HTML attributes (e.g., 'id, disabled, etc')
 * @param {string} [props.className=''] - Additional CSS classes to apply
 * @param {string | Array<string>} props.slot - content (text or child components)
 * 
 * @returns {string} Rendered HTML button element
 * 
 * @throws {ComponentError} If required props are missing or invalid types provided
 * 
/**
 * @property {string} attrs - An attributes property
 * @property {string} className - Extra classes property
 * @property {string | Array<string>} slot - string or array of strings property
 * @returns {string} - Description of what the function returns
 */

export const componentName = ({attrs, className, slot}) => {
     // Validate required props
    validateProps(
        { slot },
        ['slot'],
        { componentName: 'componentName', componentType: 'componentType' }
    );
    
    // Validate prop types
    validatePropTypes(
        { type, attrs, className, slot },
        { 
            type: 'string',
            attrs: 'string',
            className: 'string',
            // slot can be string or array
        },
        { componentName: 'button', componentType: 'atom' }
    );
    // Process attributes
    const escapedAttrs = attrs ? ` ${escapeAttr(attrs)}` : '';

    // Normalize classes
    const classes = normalizeClasses(['btn', className]);
    
    // Process slot content (trust component-rendered HTML)
    const slotContent = processSlotTrusted(slot);

    return `<div class="${classes}"${escapedAttrs}>${slotContent}</div>`;
}