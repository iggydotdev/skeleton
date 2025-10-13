import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

 
const tester = () => {
    const testRegistry = []
    try {
        const atomsDir = path.join(__dirname, '../components/atoms');
        const moleculesDdir = path.join(__dirname, '../components/molecules');
        const organismDir = path.join(__dirname, '../components/organisms');
        const folders = [atomsDir, moleculesDdir, organismDir];
        console.log(folders)
        folders.forEach(folder => {
            try {
                const components = fs.readdirSync(folder).filter(component => component !== 'index.js');
                components.forEach(component => {
                    try {
                        const testFile = fs.readdirSync(path.join(folder,component)).filter(file=> file.includes('test.js'))[0];
                        console.log(testFile);
                        const testPath = path.join(folder, component, testFile)
                        const test = import(fileURLToPath(new URL(testPath), import.meta.url)).then((module) => {
                            const res = module.test();
                            console.log(`${testFile}: ${res ? 'PASS' : 'FAIL'}`);
                        }).catch((err)=> {
                            console.log(`Error in: ${testPath}`, err)
                        })

                    } catch (err) {
                        console.log(err)
                    }
                })
            } catch (err) {
                console.log(err);
            }
            return null;
        });
    } catch (err) {
        console.log(err);
    }
}

tester();