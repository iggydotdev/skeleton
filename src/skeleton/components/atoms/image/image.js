
/**
 * @property {string} src - The source URL of the image
 * @property {string} attrs - An attributes property
 * @property {string} cxs - Extra classes property
 * @returns {string} - Description of what the function returns
 */

export const image = ({src, attrs, cxs}) => {;
    attrs = attrs? ` ${attrs}` : ``;
    cxs = cxs? ` ${cxs}` : '';
    return `<img src="${src}" class="image${cxs}"${attrs}/>`;
}   