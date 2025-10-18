import { processSlotTrusted } from '../../../utils/processSlot.js';
import { normalizeClasses } from '../../../utils/normalizeClasses.js';
import { validatePropTypes, ComponentError } from '../../../utils/ComponentError.js';
import { escapeAttr } from '../../../utils/escapeHtml.js';

/**
 * Video component - An HTML video element for embedding video content
 * 
 * Renders an HTML video element with support for multiple sources, captions,
 * and playback controls. Can use a direct src attribute or child source elements
 * for multiple video formats. Supports modern video features like autoplay,
 * loop, muted, and poster images.
 * 
 * @param {Object} props - Component properties
 * @param {string} [props.src] - Direct video source URL (shorthand for single source)
 * @param {string | Array<string>} [props.slot=''] - Child content (source elements, track elements, fallback text)
 * @param {string} [props.attrs=''] - Additional HTML attributes (e.g., 'controls autoplay muted loop')
 * @param {string} [props.className=''] - Additional CSS classes to apply
 * @param {string} [props.id] - Element ID attribute
 * @param {string} [props.poster] - Poster image URL (displayed before video plays)
 * @param {boolean} [props.controls=false] - Show video controls (play, pause, volume, etc.)
 * @param {boolean} [props.autoplay=false] - Start playing automatically (usually requires muted)
 * @param {boolean} [props.loop=false] - Loop video playback
 * @param {boolean} [props.muted=false] - Mute video audio
 * @param {string} [props.preload] - Preload behavior: 'none', 'metadata', or 'auto'
 * @param {string|number} [props.width] - Video width
 * @param {string|number} [props.height] - Video height
 * 
 * @returns {string} Rendered HTML video element
 * 
 * @throws {ComponentError} If prop types are invalid
 * 
 * @example
 * // Basic video with direct source
 * video({
 *   src: '/videos/intro.mp4',
 *   controls: true
 * })
 * // Returns: '<video src="/videos/intro.mp4" class="video" controls></video>'
 * 
 * @example
 * // Video with multiple sources (for browser compatibility)
 * video({
 *   controls: true,
 *   slot: [
 *     '<source src="/videos/intro.mp4" type="video/mp4"/>',
 *     '<source src="/videos/intro.webm" type="video/webm"/>',
 *     'Your browser does not support the video tag.'
 *   ]
 * })
 * // Returns: '<video class="video" controls><source src="/videos/intro.mp4" type="video/mp4"/><source src="/videos/intro.webm" type="video/webm"/>Your browser does not support the video tag.</video>'
 * 
 * @example
 * // Video with poster image and dimensions
 * video({
 *   src: '/videos/demo.mp4',
 *   poster: '/images/video-thumbnail.jpg',
 *   width: '640',
 *   height: '360',
 *   controls: true
 * })
 * // Returns: '<video src="/videos/demo.mp4" class="video" poster="/images/video-thumbnail.jpg" width="640" height="360" controls></video>'
 * 
 * @example
 * // Autoplay video (muted, for compliance)
 * video({
 *   src: '/videos/background.mp4',
 *   autoplay: true,
 *   loop: true,
 *   muted: true,
 *   className: 'background-video'
 * })
 * // Returns: '<video src="/videos/background.mp4" class="video background-video" autoplay loop muted></video>'
 * 
 * @example
 * // Video with captions/subtitles
 * video({
 *   src: '/videos/tutorial.mp4',
 *   controls: true,
 *   slot: '<track src="/captions/en.vtt" kind="subtitles" srclang="en" label="English"/>'
 * })
 * // Returns: '<video src="/videos/tutorial.mp4" class="video" controls><track src="/captions/en.vtt" kind="subtitles" srclang="en" label="English"/></video>'
 * 
 * @example
 * // Video with preload and custom attributes
 * video({
 *   src: '/videos/large-file.mp4',
 *   preload: 'metadata',
 *   controls: true,
 *   attrs: 'playsinline disablepictureinpicture'
 * })
 * // Returns: '<video src="/videos/large-file.mp4" class="video" preload="metadata" controls playsinline disablepictureinpicture></video>'
 */
export const video = ({
    src,
    slot = '',
    attrs = '',
    className = '',
    id,
    poster,
    controls = false,
    autoplay = false,
    loop = false,
    muted = false,
    preload,
    width,
    height
}) => {
    // Validate prop types
    validatePropTypes(
        { attrs, className },
        { 
            attrs: 'string',
            className: 'string'
        },
        { componentName: 'video', componentType: 'atom' }
    );
    
    // Warn if neither src nor slot is provided
    if (!src && (!slot || slot.length === 0)) {
        console.warn(
            `[Skeleton Warning] Video has no source. ` +
            `Provide either a 'src' prop or source elements in 'slot'.`
        );
    }
    
    // Warn about autoplay without muted (won't work in most browsers)
    if (autoplay && !muted) {
        console.warn(
            `[Skeleton Warning] Video has autoplay without muted. ` +
            `Most browsers require videos to be muted for autoplay to work. ` +
            `Add muted={true} to enable autoplay.`
        );
    }
    
    // Warn if video has no controls and no autoplay (user can't interact)
    if (!controls && !autoplay) {
        console.warn(
            `[Skeleton Warning] Video has no controls and no autoplay. ` +
            `Users won't be able to play the video. Add controls={true} or autoplay={true}.`
        );
    }
    
    // Validate preload value if provided
    if (preload && !['none', 'metadata', 'auto'].includes(preload)) {
        console.warn(
            `[Skeleton Warning] Invalid preload value: "${preload}". ` +
            `Use "none", "metadata", or "auto".`
        );
    }
    
    // Process attributes
    const escapedAttrs = attrs ? ` ${escapeAttr(attrs)}` : '';
    
    // Add src attribute if provided
    const srcAttr = src ? ` src="${escapeAttr(src)}"` : '';
    
    // Add id attribute if provided
    const idAttr = id ? ` id="${escapeAttr(id)}"` : '';
    
    // Add poster attribute if provided
    const posterAttr = poster ? ` poster="${escapeAttr(poster)}"` : '';
    
    // Add width attribute if provided
    const widthAttr = width ? ` width="${escapeAttr(String(width))}"` : '';
    
    // Add height attribute if provided
    const heightAttr = height ? ` height="${escapeAttr(String(height))}"` : '';
    
    // Add preload attribute if provided
    const preloadAttr = preload ? ` preload="${escapeAttr(preload)}"` : '';
    
    // Add boolean attributes
    const controlsAttr = controls ? ' controls' : '';
    const autoplayAttr = autoplay ? ' autoplay' : '';
    const loopAttr = loop ? ' loop' : '';
    const mutedAttr = muted ? ' muted' : '';
    
    // Normalize and escape classes
    const classes = normalizeClasses(['video', className]);
    
    // Process slot content (source elements, track elements, fallback text)
    const slotContent = processSlotTrusted(slot);
    
    return `<video class="${classes}"${srcAttr}${idAttr}${posterAttr}${widthAttr}${heightAttr}${preloadAttr}${controlsAttr}${autoplayAttr}${loopAttr}${mutedAttr}${escapedAttrs}>${slotContent}</video>`;
};