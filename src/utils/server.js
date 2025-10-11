import http from 'node:http';
import { fileURLToPath } from 'node:url';
// FOR HTTPS...
// import fs from 'fs';
// Read the SSL certificate and private key files
// const privateKey = fs.readFileSync('path/to/your/private.key', 'utf8');
// const certificate = fs.readFileSync('path/to/your/certificate.crt', 'utf8');
// const credentials = { key: privateKey, cert: certificate };

// Create the HTTPS server
// const server = https.createServer(credentials, (req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end('Hello, HTTPS World!\n');
// });

// // Listen on a secure port (e.g., 8443)
// server.listen(8443, () => {
//   console.log('HTTPS Server running on port 8443');
// });

// Create a local server to receive data from
const server = http.createServer((req, res) => {
  if (req.url !== '/') {
    const component = req.url.split('/')[1];
    const test = import(fileURLToPath(new URL(`../components/atoms/${component}/${component}.demo.js`, import.meta.url))).then((module) => {
      const demo = module.demo();
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(demo);
    }).catch((error) => {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Component not found', details: error.message }));
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        data: 'Server is running. Append /componentName to the URL to run a specific component test (e.g., /text, /box, /video, etc.).',
    }));
  }
});

server.listen(8000);