import fs from 'node:fs';
// Local imports

import { routes } from '../../routes.js';
import { generateRoute } from './generateRoute.js';

const generated = [];
const errors = [];

export const build = async (outputDir) => {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, {recursive: true});
    }

    for(const route in routes) {
        try {
            await generateRoute(route);
        } catch (error) {
            errors.push({route, error});
            console.error(`${route} failed: `, error);
        }
    }

    return ({
        generated,
        errors
    });
}


