
/**
 * @property {string} attrs - An attributes property
 * @property {string} cxs - Extra classes property
 * @returns {string} - Description of what the function returns
 */

export const input = ({ type, cxs, attrs }) => {
    attrs = attrs? ` ${attrs}` : ``; 
    cxs = cxs? ` ${cxs}` : '';
    return `<input type="${type}" class="input${cxs}"${attrs}/>`;
}