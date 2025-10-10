/**
 * 
 * @param {string | Array<string>} slot 
 * @returns string
 */
export const processSlot = (slot) => {
    if (Array.isArray(slot)) {
        return slot.join('');
    }
    return slot;
}