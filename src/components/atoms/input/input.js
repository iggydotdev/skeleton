import { normalizeClasses } from '../../../utils/normalizeClasses.js';
import { validateProps, validatePropTypes, ComponentError } from '../../../utils/ComponentError.js';
import { escapeAttr } from '../../../utils/escapeHtml.js';

/**
 * Input component - An HTML input element for form data collection
 * 
 * Renders an HTML input element with type validation, accessibility features,
 * and customizable styling. Supports all standard HTML input types including
 * text, email, password, number, date, checkbox, radio, file, and more.
 * 
 * @param {Object} props - Component properties
 * @param {string} [props.type='text'] - Input type (text, email, password, number, tel, url, search, date, time, checkbox, radio, file, etc.)
 * @param {string} [props.attrs=''] - Additional HTML attributes (e.g., 'placeholder="Enter text" required')
 * @param {string} [props.className=''] - Additional CSS classes to apply
 * @param {string} [props.id] - Input ID attribute (important for labels)
 * @param {string} [props.name] - Input name attribute (important for forms)
 * @param {string} [props.value] - Input value attribute
 * @param {string} [props.placeholder] - Placeholder text
 * @param {boolean} [props.required=false] - Whether input is required
 * @param {boolean} [props.disabled=false] - Whether input is disabled
 * @param {boolean} [props.readonly=false] - Whether input is read-only
 * @param {string} [props.ariaLabel] - Accessible label for screen readers
 * @param {string} [props.ariaDescribedBy] - ID of element describing this input
 * 
 * @returns {string} Rendered HTML input element (self-closing)
 * 
 * @throws {ComponentError} If required props are missing or have invalid types
 * 
 * @example
 * // Basic text input
 * input({ type: 'text', name: 'username', placeholder: 'Enter username' })
 * // Returns: '<input type="text" name="username" placeholder="Enter username" class="input"/>'
 * 
 * @example
 * // Email input with validation
 * input({
 *   type: 'email',
 *   name: 'email',
 *   id: 'email-field',
 *   placeholder: 'your@email.com',
 *   required: true
 * })
 * // Returns: '<input type="email" name="email" id="email-field" placeholder="your@email.com" class="input" required/>'
 * 
 * @example
 * // Password input with custom class
 * input({
 *   type: 'password',
 *   name: 'password',
 *   className: 'secure-input',
 *   attrs: 'minlength="8" autocomplete="new-password"'
 * })
 * // Returns: '<input type="password" name="password" class="input secure-input" minlength="8" autocomplete="new-password"/>'
 * 
 * @example
 * // Number input with min/max
 * input({
 *   type: 'number',
 *   name: 'age',
 *   value: '25',
 *   attrs: 'min="0" max="120" step="1"'
 * })
 * // Returns: '<input type="number" name="age" value="25" class="input" min="0" max="120" step="1"/>'
 * 
 * @example
 * // Checkbox input
 * input({
 *   type: 'checkbox',
 *   name: 'terms',
 *   id: 'terms-checkbox',
 *   value: 'accepted',
 *   attrs: 'checked'
 * })
 * // Returns: '<input type="checkbox" name="terms" id="terms-checkbox" value="accepted" class="input" checked/>'
 * 
 * @example
 * // File input with accept
 * input({
 *   type: 'file',
 *   name: 'avatar',
 *   attrs: 'accept="image/png, image/jpeg"'
 * })
 * // Returns: '<input type="file" name="avatar" class="input" accept="image/png, image/jpeg"/>'
 * 
 * @example
 * // Accessible input with ARIA
 * input({
 *   type: 'text',
 *   name: 'search',
 *   ariaLabel: 'Search products',
 *   ariaDescribedBy: 'search-help'
 * })
 * // Returns: '<input type="text" name="search" class="input" aria-label="Search products" aria-describedby="search-help"/>'
 */
export const input = ({
    type = 'text',
    attrs = '',
    className = '',
    id,
    name,
    value,
    placeholder,
    required = false,
    disabled = false,
    readonly = false,
    ariaLabel,
    ariaDescribedBy
}) => {
    // Validate prop types
    validatePropTypes(
        { type, attrs, className },
        { 
            type: 'string',
            attrs: 'string',
            className: 'string'
        },
        { componentName: 'input', componentType: 'atom' }
    );
    
    // Validate input type
    const validTypes = [
        'text', 'email', 'password', 'number', 'tel', 'url', 'search',
        'date', 'time', 'datetime-local', 'month', 'week',
        'checkbox', 'radio', 'file', 'color', 'range',
        'hidden', 'submit', 'reset', 'button'
    ];
    
    if (!validTypes.includes(type)) {
        console.warn(
            `[Skeleton Warning] Unknown input type: "${type}". ` +
            `Valid types are: ${validTypes.join(', ')}. ` +
            `Defaulting to "text".`
        );
    }
    
    // Warn if name is missing (forms need names to submit data)
    if (!name && type !== 'button' && type !== 'submit' && type !== 'reset') {
        console.warn(
            `[Skeleton Warning] Input of type "${type}" is missing a "name" attribute. ` +
            `Form inputs need names to submit data properly.`
        );
    }
    
    // Warn if checkbox/radio is missing value
    if ((type === 'checkbox' || type === 'radio') && !value) {
        console.warn(
            `[Skeleton Warning] ${type} input is missing a "value" attribute. ` +
            `Checkbox and radio inputs should have explicit values.`
        );
    }
    
    // Process attributes
    const escapedAttrs = attrs ? ` ${escapeAttr(attrs)}` : '';
    
    // Add id attribute if provided
    const idAttr = id ? ` id="${escapeAttr(id)}"` : '';
    
    // Add name attribute if provided
    const nameAttr = name ? ` name="${escapeAttr(name)}"` : '';
    
    // Add value attribute if provided
    const valueAttr = value ? ` value="${escapeAttr(value)}"` : '';
    
    // Add placeholder attribute if provided
    const placeholderAttr = placeholder ? ` placeholder="${escapeAttr(placeholder)}"` : '';
    
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
    const classes = normalizeClasses(['input', className]);
    
    // Escape the type
    const escapedType = escapeAttr(type);
    
    return `<input type="${escapedType}" class="${classes}"${nameAttr}${idAttr}${valueAttr}${placeholderAttr}${requiredAttr}${disabledAttr}${readonlyAttr}${ariaLabelAttr}${ariaDescribedByAttr}${escapedAttrs}/>`;
};