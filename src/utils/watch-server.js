import { watch } from 'node:fs';
import { createServer } from 'node:http';
import { renderPage } from './renderPage.js';
import { router } from './router.js';

const PORT = 3000;
const WATCH_DIRS = ['./skeleton/components', './flesh/pages'];

const startDevServer = () => {
    const server = createServer(async (req, res) => {
        try {
            const route = await router(req.url);
            const html = renderPage(route.content, route.meta);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
        } catch (err) {
            res.writeHead(500);
            res.end(`<pre>${err.stack}</pre>`);
        }
    });

    // Watch for file changes
    WATCH_DIRS.forEach(dir => {
        watch(dir, { recursive: true }, (event, filename) => {
            console.log(`🔄 ${filename} changed - clearing require cache`);
            Object.keys(require.cache).forEach(key => {
                if (key.includes(dir)) {
                    delete require.cache[key];
                }
            });
        });
    });

    server.listen(PORT, () => {
        console.log(`
🚀 Dev server running:
   http://localhost:${PORT}
👀 Watching for changes in:
   ${WATCH_DIRS.join('\n   ')}
        `);
    });
};