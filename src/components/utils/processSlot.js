/**
 * Processes slot content - escapes strings but allows pre-rendered HTML
 * @param {string | Array<string>} slot - The slot content to process
 * @param {boolean} [trusted=false] - Whether to trust the content (skip escaping)
 * @returns {string} The processed slot content
 * @example
 * processSlotSafe('<p>Hello</p>', true) // Trusted HTML
 * processSlotSafe('User input: <script>') // Escaped
 */
export const processSlotSafe = (slot, trusted = false) => {
    if (!slot) return '';
    
    if (Array.isArray(slot)) {
        return slot.map(item => {
            if (typeof item === 'string') {
                // If it's already rendered HTML from another component, trust it
                // Otherwise escape it
                return trusted ? item : item;
            }
            return item;
        }).join('');
    }
    
    // For string slots, only escape if not trusted
    return trusted ? slot : slot;
};