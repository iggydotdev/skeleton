/**
 * 
 * @param {string} classes 
 * @returns string
 */

export const normaliseClasses = (classes) => {
    if (!classes) return '';
    return classes.split(' ').filter(c=>c.trim()).join(' ');
}