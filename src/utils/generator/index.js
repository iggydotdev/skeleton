import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createComponent = (componentType, componentName) => {
    const componentDir = path.join(__dirname, 'templates');
    const targetDir = path.join(__dirname, `../../components/${componentType}s`, componentName);
    console.log(`Creating component ${componentName} of type ${componentType} at ${targetDir}`);
    if (!fs.existsSync(targetDir)){
        fs.mkdirSync(targetDir);
    }

    const files = ['index.js', 'componentName.js', 'componentName.test.js'];

    files.forEach(file => {
        const content = fs.readFileSync(path.join(componentDir, file), 'utf8');
        const updatedContent = content.replace(/componentName/g, componentName);
        fs.writeFileSync(path.join(targetDir, file.replace('componentName', componentName)), updatedContent);
    });
}

const args= process.argv.slice(2);
console.log(args);

const componentType = args[0];
const componentName = args[1];

createComponent(componentType, componentName);

