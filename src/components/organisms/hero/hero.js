import { processSlotTrusted } from '../../../utils/processSlot.js';
import { normalizeClasses } from '../../../utils/normalizeClasses.js';
import { validateProps, validatePropTypes, ComponentError } from '../../../utils/ComponentError.js';
import { escapeAttr } from '../../../utils/escapeHtml.js';
import { box } from '../../atoms/index.js';

/**
 * Hero component - A prominent banner/hero section for page intros
 * 
 * Renders a hero section using the box atom with role="hero". Hero sections are
 * large, prominent areas typically at the top of a page used to grab attention
 * and communicate the main message. Often includes headlines, subheadings, images,
 * and call-to-action buttons.
 * 
 * Common use cases:
 * - Landing page heroes with headline and CTA
 * - Product showcase heroes
 * - Campaign/promotional banners
 * - Page introductions with key messaging
 * - Image backgrounds with overlaid text
 * 
 * @param {Object} props - Component properties
 * @param {string | Array<string>} props.slot - Hero content (headline, subheading, image, CTA, etc.)
 * @param {string} [props.attrs=''] - Additional HTML attributes (e.g., 'data-background="dark"')
 * @param {string} [props.className=''] - Additional CSS classes to apply
 * @param {string} [props.id] - Hero section ID attribute
 * @param {string} [props.ariaLabel] - Accessible label for screen readers
 * @param {string} [props.backgroundImage] - Background image URL (added as inline style)
 * 
 * @returns {string} Rendered HTML hero section (div with role="hero")
 * 
 * @throws {ComponentError} If required prop (slot) is missing
 * 
 * @example
 * // Basic hero with headline and CTA
 * hero({
 *   slot: [
 *     '<h1>Welcome to Our Site</h1>',
 *     '<p>Build amazing things with zero dependencies</p>',
 *     '<a href="/get-started" class="btn">Get Started</a>'
 *   ]
 * })
 * // Returns: '<div class="box hero" role="hero"><h1>Welcome to Our Site</h1>...</div>'
 * 
 * @example
 * // Hero with custom styling
 * hero({
 *   className: 'full-height centered',
 *   slot: [
 *     '<h1 class="display-1">Big Headline</h1>',
 *     '<p class="lead">Supporting text that explains the value proposition</p>',
 *     '<div class="cta-buttons">',
 *     '  <button class="btn primary">Primary Action</button>',
 *     '  <button class="btn secondary">Learn More</button>',
 *     '</div>'
 *   ]
 * })
 * // Returns: '<div class="box hero full-height centered" role="hero">...</div>'
 * 
 * @example
 * // Hero with background image
 * hero({
 *   backgroundImage: '/images/hero-bg.jpg',
 *   className: 'text-white',
 *   slot: [
 *     '<h1>Adventure Awaits</h1>',
 *     '<p>Discover amazing experiences</p>'
 *   ]
 * })
 * // Returns: '<div class="box hero text-white" role="hero" style="background-image: url(\'/images/hero-bg.jpg\')">...</div>'
 * 
 * @example
 * // Product hero with image
 * hero({
 *   className: 'product-hero',
 *   slot: [
 *     '<div class="hero-content">',
 *     '  <h1>Introducing Product X</h1>',
 *     '  <p>Revolutionary features that change everything</p>',
 *     '  <button class="btn">Pre-order Now</button>',
 *     '</div>',
 *     '<div class="hero-image">',
 *     '  <img src="/product.png" alt="Product X"/>',
 *     '</div>'
 *   ]
 * })
 * 
 * @example
 * // Accessible hero with ID and aria-label
 * hero({
 *   id: 'main-hero',
 *   ariaLabel: 'Main page introduction and call to action',
 *   slot: [
 *     '<h1>Your Journey Starts Here</h1>',
 *     '<p>Join thousands of users already benefiting</p>',
 *     '<a href="/signup">Sign Up Free</a>'
 *   ]
 * })
 * // Returns: '<div class="box hero" id="main-hero" role="hero" aria-label="Main page introduction and call to action">...</div>'
 * 
 * @example
 * // Minimal hero with just heading
 * hero({
 *   className: 'simple',
 *   slot: '<h1>Page Title</h1>'
 * })
 * // Returns: '<div class="box hero simple" role="hero"><h1>Page Title</h1></div>'
 */
export const hero = ({
    slot,
    attrs = '',
    className = '',
    id,
    ariaLabel,
    backgroundImage
}) => {
    // Validate required props
    validateProps(
        { slot },
        ['slot'],
        { componentName: 'hero', componentType: 'organism' }
    );
    
    // Validate prop types
    validatePropTypes(
        { attrs, className },
        { 
            attrs: 'string',
            className: 'string'
        },
        { componentName: 'hero', componentType: 'organism' }
    );
    
    // Validate slot is not empty
    if ((typeof slot === 'string' && slot.trim().length === 0) || 
        (Array.isArray(slot) && slot.length === 0)) {
        console.warn(
            `[Skeleton Warning] Hero has empty content. ` +
            `Hero sections should contain headlines, descriptions, or calls-to-action.`
        );
    }
    
    // Suggest including h1 for SEO and accessibility
    const slotString = Array.isArray(slot) ? slot.join('') : slot;
    if (!slotString.includes('<h1')) {
        console.info(
            `[Skeleton Info] Hero section should typically include an <h1> heading ` +
            `for SEO and accessibility best practices.`
        );
    }
    
    // Process attributes
    let escapedAttrs = attrs ? ` ${escapeAttr(attrs)}` : '';
    
    // Add id attribute if provided
    const idAttr = id ? ` id="${escapeAttr(id)}"` : '';
    
    // Add aria-label for accessibility if provided
    const ariaLabelAttr = ariaLabel 
        ? ` aria-label="${escapeAttr(ariaLabel)}"` 
        : '';
    
    // Add background image as inline style if provided
    let backgroundStyleAttr = '';
    if (backgroundImage) {
        const escapedBgImage = escapeAttr(backgroundImage);
        backgroundStyleAttr = ` style="background-image: url('${escapedBgImage}')"`;
    }
    
    // Normalize classes - hero class plus any custom classes
    const classes = normalizeClasses(['hero', className]);
    
    // Process slot content
    const slotContent = processSlotTrusted(slot);
    
    // Combine all attributes for box
    const boxAttrs = `role="hero"${idAttr}${ariaLabelAttr}${backgroundStyleAttr}${escapedAttrs}`.trim();
    
    // Use box component as the base
    return box({
        is: 'div',
        className: classes,
        attrs: boxAttrs,
        slot: slotContent
    });
};