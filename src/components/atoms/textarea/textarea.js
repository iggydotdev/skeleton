
/**
 * @property {string} attrs - An attributes property
 * @property {string} cxs - Extra classes property
 * @returns {string} - Description of what the function returns
 */

export const textarea = ({attrs, cxs}) => { 
    attrs = attrs? ` ${attrs}` : ``;
    cxs = cxs? ` ${cxs}` : '';
    return `<textarea class="textarea${cxs}"${attrs}/>`;
}