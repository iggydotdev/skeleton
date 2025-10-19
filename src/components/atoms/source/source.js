import { normalizeClasses } from '../../utils/normalizeClasses.js';
import { validateProps, validatePropTypes, ComponentError } from '../../utils/ComponentError.js';
import { escapeAttr } from '../../utils/escapeHtml.js';

/**
 * Source component - An HTML source element for media resources
 * 
 * Renders an HTML source element used inside picture or video elements to specify
 * multiple media resources. Allows browsers to choose the most appropriate source
 * based on format support, screen size, or other factors. Essential for responsive
 * images and cross-browser video compatibility.
 * 
 * Two types:
 * 1. Image sources (for picture element) - use 'src' attribute
 * 2. Video sources (for video element) - use 'srcset' attribute
 * 
 * @param {Object} props - Component properties
 * @param {('image'|'video')} props.type - Source type: 'image' for picture, 'video' for video element
 * @param {string} [props.src] - Image source URL (required for type='image')
 * @param {string} [props.srcset] - Video source URL (required for type='video')
 * @param {string} [props.attrs=''] - Additional HTML attributes (e.g., 'media="(min-width: 800px)" type="image/webp"')
 * @param {string} [props.className=''] - Additional CSS classes to apply
 * @param {string} [props.media] - Media query for responsive images (shorthand for attrs)
 * @param {string} [props.mimeType] - MIME type of the source (shorthand for type attribute)
 * @param {string} [props.sizes] - Image sizes for responsive images (use with srcset)
 * 
 * @returns {string} Rendered HTML source element (self-closing)
 * 
 * @throws {ComponentError} If required props are missing or invalid
 * 
 * @example
 * // Image source for picture element (WebP format)
 * source({
 *   type: 'image',
 *   src: '/images/photo.webp',
 *   mimeType: 'image/webp'
 * })
 * // Returns: '<source src="/images/photo.webp" type="image/webp" class="img-src"/>'
 * 
 * @example
 * // Image source with media query (responsive)
 * source({
 *   type: 'image',
 *   src: '/images/photo-large.jpg',
 *   media: '(min-width: 1024px)',
 *   mimeType: 'image/jpeg'
 * })
 * // Returns: '<source src="/images/photo-large.jpg" media="(min-width: 1024px)" type="image/jpeg" class="img-src"/>'
 * 
 * @example
 * // Image source with srcset and sizes (resolution switching)
 * source({
 *   type: 'image',
 *   src: '/images/photo.jpg',
 *   attrs: 'srcset="/images/photo-400.jpg 400w, /images/photo-800.jpg 800w"',
 *   sizes: '(max-width: 600px) 400px, 800px',
 *   mimeType: 'image/jpeg'
 * })
 * 
 * @example
 * // Video source (MP4 format)
 * source({
 *   type: 'video',
 *   srcset: '/videos/movie.mp4',
 *   mimeType: 'video/mp4'
 * })
 * // Returns: '<source src="/videos/movie.mp4" type="video/mp4" class="video-src"/>'
 * 
 * @example
 * // Video source (WebM format)
 * source({
 *   type: 'video',
 *   srcset: '/videos/movie.webm',
 *   mimeType: 'video/webm'
 * })
 * // Returns: '<source src="/videos/movie.webm" type="video/webm" class="video-src"/>'
 * 
 * @example
 * // AVIF image source (modern format)
 * source({
 *   type: 'image',
 *   src: '/images/hero.avif',
 *   mimeType: 'image/avif',
 *   className: 'modern-format'
 * })
 * // Returns: '<source src="/images/hero.avif" type="image/avif" class="img-src modern-format"/>'
 */
export const source = ({
    type,
    src,
    srcset,
    attrs = '',
    className = '',
    media,
    mimeType,
    sizes
}) => {
    // Validate required props
    validateProps(
        { type },
        ['type'],
        { componentName: 'source', componentType: 'atom' }
    );
    
    // Validate prop types
    validatePropTypes(
        { type, attrs, className },
        { 
            type: 'string',
            attrs: 'string',
            className: 'string'
        },
        { componentName: 'source', componentType: 'atom' }
    );
    
    // Validate type is either 'image' or 'video'
    if (type !== 'image' && type !== 'video') {
        throw new ComponentError(
            `Invalid type: "${type}". Must be either "image" or "video".`,
            { componentName: 'source', componentType: 'atom', props: { type } }
        );
    }
    
    // Validate that appropriate source attribute is provided
    if (type === 'image' && !src) {
        throw new ComponentError(
            'Image sources require a "src" attribute.',
            { componentName: 'source', componentType: 'atom', props: { type, src } }
        );
    }
    
    if (type === 'video' && !srcset) {
        throw new ComponentError(
            'Video sources require a "srcset" attribute.',
            { componentName: 'source', componentType: 'atom', props: { type, srcset } }
        );
    }
    
    // Warn if MIME type is missing (helps browsers choose correct source)
    if (!mimeType && !attrs.includes('type=')) {
        console.warn(
            `[Skeleton Warning] Source element should include a MIME type ` +
            `(e.g., mimeType="image/webp" or mimeType="video/mp4") ` +
            `to help browsers select the correct format.`
        );
    }
    
    // Process attributes
    const escapedAttrs = attrs ? ` ${escapeAttr(attrs)}` : '';
    
    // Determine the source attribute based on type
    // Note: HTML spec uses 'srcset' for picture sources, but for simplicity
    // we use 'src' for images and 'srcset' for videos in our API
    let sourceAttr = '';
    if (type === 'video') {
        sourceAttr = ` src="${escapeAttr(srcset)}"`;
    } else {
        // type === 'image'
        sourceAttr = ` src="${escapeAttr(src)}"`;
    }
    
    // Add media query attribute if provided
    const mediaAttr = media ? ` media="${escapeAttr(media)}"` : '';
    
    // Add MIME type attribute if provided
    const typeAttr = mimeType ? ` type="${escapeAttr(mimeType)}"` : '';
    
    // Add sizes attribute if provided (for responsive images)
    const sizesAttr = sizes ? ` sizes="${escapeAttr(sizes)}"` : '';
    
    // Determine base class based on type
    const baseClass = type === 'video' ? 'video-src' : 'img-src';
    
    // Normalize and escape classes
    const classes = normalizeClasses([baseClass, className]);
    
    return `<source${sourceAttr}${mediaAttr}${typeAttr}${sizesAttr} class="${classes}"${escapedAttrs}/>`;
};