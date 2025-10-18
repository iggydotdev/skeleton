import { processSlotTrusted } from '../../../utils/processSlot.js';
import { normalizeClasses } from '../../../utils/normalizeClasses.js';
import { validateProps, validatePropTypes, ComponentError } from '../../../utils/ComponentError.js';
import { escapeAttr } from '../../../utils/escapeHtml.js';

/**
 * Link component - An HTML anchor element for navigation
 * 
 * Renders an HTML anchor (<a>) element with URL validation, security features,
 * and customizable styling. Automatically adds rel="noopener noreferrer" for
 * external links that open in new tabs to prevent security vulnerabilities.
 * 
 * @param {Object} props - Component properties
 * @param {string} props.url - The destination URL (href attribute)
 * @param {string} props.slot - Link text or child components
 * @param {string} [props.attrs=''] - Additional HTML attributes (e.g., 'data-track="click"')
 * @param {string} [props.className=''] - Additional CSS classes to apply
 * @param {boolean} [props.external=false] - Whether link opens in new tab (adds target="_blank")
 * @param {string} [props.rel] - Custom rel attribute (overrides default security settings)
 * @param {string} [props.ariaLabel] - Accessible label for screen readers
 * @param {boolean} [props.download=false] - Whether link triggers a download
 * 
 * @returns {string} Rendered HTML anchor element
 * 
 * @throws {ComponentError} If required props (url, slot) are missing or have invalid types
 * 
 * @example
 * // Basic internal link
 * link({ url: '/about', slot: 'About Us' })
 * // Returns: '<a href="/about" class="link">About Us</a>'
 * 
 * @example
 * // External link with security (opens in new tab)
 * link({ 
 *   url: 'https://example.com',
 *   slot: 'Visit Example',
 *   external: true
 * })
 * // Returns: '<a href="https://example.com" class="link" target="_blank" rel="noopener noreferrer">Visit Example</a>'
 * 
 * @example
 * // Link with custom styling and attributes
 * link({
 *   url: '/contact',
 *   slot: 'Get in Touch',
 *   className: 'btn primary',
 *   attrs: 'data-track="nav-click" id="contact-link"'
 * })
 * // Returns: '<a href="/contact" class="link btn primary" data-track="nav-click" id="contact-link">Get in Touch</a>'
 * 
 * @example
 * // Accessible link with aria-label
 * link({
 *   url: '/profile',
 *   slot: '<img src="avatar.jpg" alt=""/>',
 *   ariaLabel: 'View user profile'
 * })
 * // Returns: '<a href="/profile" class="link" aria-label="View user profile"><img src="avatar.jpg" alt=""/></a>'
 * 
 * @example
 * // Download link
 * link({
 *   url: '/files/document.pdf',
 *   slot: 'Download PDF',
 *   download: true
 * })
 * // Returns: '<a href="/files/document.pdf" class="link" download>Download PDF</a>'
 */
export const link = ({
    url,
    slot,
    attrs = '',
    className = '',
    external = false,
    rel,
    ariaLabel,
    download = false
}) => {
    // Validate required props
    validateProps(
        { url, slot },
        ['url', 'slot'],
        { componentName: 'link', componentType: 'atom' }
    );
    
    // Validate prop types
    validatePropTypes(
        { url, attrs, className },
        { 
            url: 'string',
            attrs: 'string',
            className: 'string'
        },
        { componentName: 'link', componentType: 'atom' }
    );
    
    // Validate URL is not empty
    if (url.trim().length === 0) {
        throw new ComponentError(
            'URL cannot be empty',
            { componentName: 'link', componentType: 'atom', props: { url, slot } }
        );
    }
    
    // Security: Warn about potentially dangerous protocols
    const dangerousProtocols = ['javascript:', 'data:', 'vbscript:'];
    const urlLower = url.toLowerCase().trim();
    if (dangerousProtocols.some(protocol => urlLower.startsWith(protocol))) {
        console.warn(
            `[Skeleton Warning] Potentially dangerous URL protocol in link: "${url}". ` +
            `This may pose a security risk (XSS vulnerability).`
        );
    }
    
    // Process attributes
    const escapedAttrs = attrs ? ` ${escapeAttr(attrs)}` : '';
    
    // Handle external links (open in new tab)
    const targetAttr = external ? ' target="_blank"' : '';
    
    // Security: Add rel="noopener noreferrer" for external links to prevent:
    // - window.opener exploitation (noopener)
    // - referrer leakage (noreferrer)
    let relAttr = '';
    if (rel) {
        // User provided custom rel, use it
        relAttr = ` rel="${escapeAttr(rel)}"`;
    } else if (external) {
        // Auto-add security attributes for external links
        relAttr = ' rel="noopener noreferrer"';
    }
    
    // Add download attribute if specified
    const downloadAttr = download ? ' download' : '';
    
    // Add aria-label for accessibility if provided
    const ariaLabelAttr = ariaLabel 
        ? ` aria-label="${escapeAttr(ariaLabel)}"` 
        : '';
    
    // Normalize and escape classes
    const classes = normalizeClasses(['link', className]);
    
    // Process slot content (trust component-rendered HTML)
    const slotContent = processSlotTrusted(slot);
    
    // Escape the URL for href attribute
    const escapedUrl = escapeAttr(url);
    
    return `<a href="${escapedUrl}" class="${classes}"${targetAttr}${relAttr}${downloadAttr}${escapedAttrs}${ariaLabelAttr}>${slotContent}</a>`;
};