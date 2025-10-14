import fs from 'node:fs';
import path from 'node:path';

// Local imports
import { compose } from '../../compose.js';
import { renderPage } from '../../renderPage.js';
import { router } from '../../router.js';
import { routes } from '../../routes.js';


/**
 * 
 * @param {route} route 
 */

export const generateRoute = async (route) => {
    const pattern = route.pattern

    // skip for now dynamic routes
    const filePath = path.join(`public`, pattern);
    const dirPath = path.dirname(filePath);

    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, {recursive: true})
    }

    const content = compose(route.components);
    const html = renderPage(content, route.meta);

    fs.writeFileSync(filePath, html, `utf8`);

    // this returns generated
    return ({
        path: pattern,
        file: filePath,
    })



}