import { normalizeClasses } from '../../utils/normalizeClasses.js';
import { validatePropTypes } from '../../utils/componentError.js';
import { escapeAttr } from '../../utils/escapeAttr.js';

/**
 * Divider component - An HTML hr element for visual content separation
 * 
 * Renders an HTML horizontal rule (hr) element for creating visual breaks
 * between sections of content. Semantic element that helps structure content
 * and improve readability. Useful for separating content blocks, sections,
 * or creating visual rhythm in layouts.
 * 
 * @param {Object} [props={}] - Component properties (all optional)
 * @param {string} [props.attrs=''] - Additional HTML attributes (e.g., 'data-section="break" aria-hidden="true"')
 * @param {string} [props.className=''] - Additional CSS classes to apply
 * @param {string} [props.id] - Element ID attribute
 * @param {string} [props.role] - ARIA role attribute (default is 'separator' by browser)
 * @param {boolean} [props.decorative=false] - If true, adds aria-hidden="true" for decorative dividers
 * 
 * @returns {string} Rendered HTML hr element (self-closing)
 * 
 * @example
 * // Basic divider
 * divider()
 * // Returns: '<hr class="divider"/>'
 * 
 * @example
 * // Divider with custom class
 * divider({ className: 'section-break thick' })
 * // Returns: '<hr class="divider section-break thick"/>'
 * 
 * @example
 * // Divider with ID for styling
 * divider({ 
 *   id: 'main-divider',
 *   className: 'gradient'
 * })
 * // Returns: '<hr class="divider gradient" id="main-divider"/>'
 * 
 * @example
 * // Decorative divider (hidden from screen readers)
 * divider({ 
 *   decorative: true,
 *   className: 'fancy-decoration'
 * })
 * // Returns: '<hr class="divider fancy-decoration" aria-hidden="true"/>'
 * 
 * @example
 * // Divider with data attributes
 * divider({ 
 *   attrs: 'data-spacing="large" data-style="dashed"'
 * })
 * // Returns: '<hr class="divider" data-spacing="large" data-style="dashed"/>'
 * 
 * @example
 * // Multiple dividers with different styles
 * divider({ className: 'solid' })
 * divider({ className: 'dashed' })
 * divider({ className: 'dotted' })
 */
export const divider = ({
    attrs = '',
    className = '',
    id,
    role,
    decorative = false
} = {}) => {
    // Validate prop types
    validatePropTypes(
        { attrs, className },
        { 
            attrs: 'string',
            className: 'string'
        },
        { componentName: 'divider', componentType: 'atom' }
    );
    
    // Process attributes
    const escapedAttrs = attrs ? ` ${escapeAttr(attrs)}` : '';
    
    // Add id attribute if provided
    const idAttr = id ? ` id="${escapeAttr(id)}"` : '';
    
    // Add role attribute if provided (browsers default to 'separator')
    const roleAttr = role ? ` role="${escapeAttr(role)}"` : '';
    
    // Add aria-hidden if decorative (hide from screen readers)
    // Use this for purely visual dividers that don't add semantic meaning
    const ariaHiddenAttr = decorative ? ' aria-hidden="true"' : '';
    
    // Normalize and escape classes
    const classes = normalizeClasses(['divider', className]);
    
    return `<hr class="${classes}"${idAttr}${roleAttr}${ariaHiddenAttr}${escapedAttrs}/>`;
};