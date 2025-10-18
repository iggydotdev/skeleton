import { normalizeClasses } from '../../../utils/normalizeClasses.js';
import { validateProps, validatePropTypes, ComponentError } from '../../../utils/ComponentError.js';
import { escapeAttr, escapeHtml } from '../../../utils/escapeHtml.js';

/**
 * Textarea component - An HTML textarea element for multi-line text input
 * 
 * Renders an HTML textarea element with validation, accessibility features,
 * and customizable styling. Supports multi-line text input with optional
 * rows/cols sizing, character limits, and form integration.
 * 
 * @param {Object} props - Component properties
 * @param {string} [props.attrs=''] - Additional HTML attributes (e.g., 'rows="5" cols="40" maxlength="500"')
 * @param {string} [props.className=''] - Additional CSS classes to apply
 * @param {string} [props.id] - Textarea ID attribute (important for labels)
 * @param {string} [props.name] - Textarea name attribute (important for forms)
 * @param {string} [props.value=''] - Initial textarea content/value
 * @param {string} [props.placeholder] - Placeholder text
 * @param {number|string} [props.rows] - Number of visible text rows
 * @param {number|string} [props.cols] - Number of visible text columns
 * @param {number|string} [props.maxlength] - Maximum character length
 * @param {boolean} [props.required=false] - Whether textarea is required
 * @param {boolean} [props.disabled=false] - Whether textarea is disabled
 * @param {boolean} [props.readonly=false] - Whether textarea is read-only
 * @param {string} [props.ariaLabel] - Accessible label for screen readers
 * @param {string} [props.ariaDescribedBy] - ID of element describing this textarea
 * 
 * @returns {string} Rendered HTML textarea element
 * 
 * @throws {ComponentError} If prop types are invalid
 * 
 * @example
 * // Basic textarea
 * textarea({ 
 *   name: 'message',
 *   placeholder: 'Enter your message here...'
 * })
 * // Returns: '<textarea name="message" placeholder="Enter your message here..." class="textarea"></textarea>'
 * 
 * @example
 * // Textarea with dimensions and character limit
 * textarea({
 *   name: 'bio',
 *   id: 'user-bio',
 *   rows: 5,
 *   cols: 50,
 *   maxlength: 500,
 *   placeholder: 'Tell us about yourself...'
 * })
 * // Returns: '<textarea name="bio" id="user-bio" rows="5" cols="50" maxlength="500" placeholder="Tell us about yourself..." class="textarea"></textarea>'
 * 
 * @example
 * // Textarea with default value (pre-filled)
 * textarea({
 *   name: 'comment',
 *   value: 'This is my initial comment.',
 *   rows: 3
 * })
 * // Returns: '<textarea name="comment" rows="3" class="textarea">This is my initial comment.</textarea>'
 * 
 * @example
 * // Required textarea with custom class
 * textarea({
 *   name: 'feedback',
 *   className: 'feedback-box large',
 *   required: true,
 *   attrs: 'data-required="true"'
 * })
 * // Returns: '<textarea name="feedback" class="textarea feedback-box large" required data-required="true"></textarea>'
 * 
 * @example
 * // Disabled textarea (read-only display)
 * textarea({
 *   name: 'terms',
 *   value: 'Terms and conditions text here...',
 *   disabled: true,
 *   rows: 10
 * })
 * // Returns: '<textarea name="terms" rows="10" class="textarea" disabled>Terms and conditions text here...</textarea>'
 * 
 * @example
 * // Accessible textarea with ARIA
 * textarea({
 *   name: 'notes',
 *   ariaLabel: 'Additional notes',
 *   ariaDescribedBy: 'notes-help',
 *   attrs: 'spellcheck="true"'
 * })
 * // Returns: '<textarea name="notes" class="textarea" aria-label="Additional notes" aria-describedby="notes-help" spellcheck="true"></textarea>'
 */
export const textarea = ({
    attrs = '',
    className = '',
    id,
    name,
    value = '',
    placeholder,
    rows,
    cols,
    maxlength,
    required = false,
    disabled = false,
    readonly = false,
    ariaLabel,
    ariaDescribedBy
}) => {
    // Validate prop types
    validatePropTypes(
        { attrs, className, value },
        { 
            attrs: 'string',
            className: 'string',
            value: 'string'
        },
        { componentName: 'textarea', componentType: 'atom' }
    );
    
    // Warn if name is missing (forms need names to submit data)
    if (!name) {
        console.warn(
            `[Skeleton Warning] Textarea is missing a "name" attribute. ` +
            `Form textareas need names to submit data properly.`
        );
    }
    
    // Validate rows/cols if provided
    if (rows !== undefined) {
        const rowsNum = Number(rows);
        if (isNaN(rowsNum) || rowsNum < 1) {
            console.warn(
                `[Skeleton Warning] Invalid "rows" value: "${rows}". ` +
                `Must be a positive number. Defaulting to browser behavior.`
            );
        }
    }
    
    if (cols !== undefined) {
        const colsNum = Number(cols);
        if (isNaN(colsNum) || colsNum < 1) {
            console.warn(
                `[Skeleton Warning] Invalid "cols" value: "${cols}". ` +
                `Must be a positive number. Defaulting to browser behavior.`
            );
        }
    }
    
    // Validate maxlength if provided
    if (maxlength !== undefined) {
        const maxlengthNum = Number(maxlength);
        if (isNaN(maxlengthNum) || maxlengthNum < 0) {
            console.warn(
                `[Skeleton Warning] Invalid "maxlength" value: "${maxlength}". ` +
                `Must be a non-negative number.`
            );
        }
    }
    
    // Process attributes
    const escapedAttrs = attrs ? ` ${escapeAttr(attrs)}` : '';
    
    // Add id attribute if provided
    const idAttr = id ? ` id="${escapeAttr(id)}"` : '';
    
    // Add name attribute if provided
    const nameAttr = name ? ` name="${escapeAttr(name)}"` : '';
    
    // Add placeholder attribute if provided
    const placeholderAttr = placeholder ? ` placeholder="${escapeAttr(placeholder)}"` : '';
    
    // Add rows attribute if provided
    const rowsAttr = rows !== undefined ? ` rows="${escapeAttr(String(rows))}"` : '';
    
    // Add cols attribute if provided
    const colsAttr = cols !== undefined ? ` cols="${escapeAttr(String(cols))}"` : '';
    
    // Add maxlength attribute if provided
    const maxlengthAttr = maxlength !== undefined ? ` maxlength="${escapeAttr(String(maxlength))}"` : '';
    
    // Add required attribute if true
    const requiredAttr = required ? ' required' : '';
    
    // Add disabled attribute if true
    const disabledAttr = disabled ? ' disabled' : '';
    
    // Add readonly attribute if true
    const readonlyAttr = readonly ? ' readonly' : '';
    
    // Add aria-label for accessibility if provided
    const ariaLabelAttr = ariaLabel 
        ? ` aria-label="${escapeAttr(ariaLabel)}"` 
        : '';
    
    // Add aria-describedby for accessibility if provided
    const ariaDescribedByAttr = ariaDescribedBy 
        ? ` aria-describedby="${escapeAttr(ariaDescribedBy)}"` 
        : '';
    
    // Normalize and escape classes
    const classes = normalizeClasses(['textarea', className]);
    
    // Escape the value content (this goes inside the textarea tags)
    // Important: textarea content must be HTML-escaped to prevent XSS
    const escapedValue = escapeHtml(value);
    
    return `<textarea class="${classes}"${nameAttr}${idAttr}${rowsAttr}${colsAttr}${maxlengthAttr}${placeholderAttr}${requiredAttr}${disabledAttr}${readonlyAttr}${ariaLabelAttr}${ariaDescribedByAttr}${escapedAttrs}>${escapedValue}</textarea>`;
};