import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

 
const tester = () => {
    const atomsDir = path.join(__dirname, '../atoms');
    const moleculesDdir = path.join(__dirname, '../molecules');
    const organismDir = path.join(__dirname, '../organisms');
    const folders = [atomsDir, moleculesDdir, organismDir];

    folders.forEach(folder => {
        try {
            const components = fs.readdirSync(folder).filter(component => component !== 'index.js');
            components.forEach(component => {
                let testFile 
                try {
                    testFile = fs.readdirSync(path.join(folder,component)).filter(file=> file.includes('test.js'))[0];

                    const testPath = path.join(folder, component, testFile)
                    import(fileURLToPath(testPath)).then(async (module) => {
                        const res = await module.test();
                        console.log(`${testFile}: ${res ? 'PASS' : 'FAIL'}`);
                    }).catch((err)=> {
                        throw new Error(`Error in: ${testPath} - ${err.message}`);
                    })

                } catch (err) {
                    throw new Error(`Error in ${testFile}: ${err.message}`);
                }
            })
        } catch (err) {
            throw new Error (`Error reading components: ${err.message}`);
        }
    });
    
}

tester();