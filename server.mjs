import { createServer } from 'http';
import { readFileSync } from 'fs';
const html = readFileSync('C:/Users/jaska/Projects/taivaltech-website/index.html');
createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.end(html);
}).listen(3456, () => console.log('Server running on http://localhost:3456'));
