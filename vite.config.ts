import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-contents-dev',
      configureServer(server) {
        server.middlewares.use('/contents', (req, res, next) => {
          const relativePath = (req.url || '').split('?')[0];
          const filePath = path.join(__dirname, 'contents', relativePath);
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            if (filePath.endsWith('.json')) {
              res.setHeader('Content-Type', 'application/json; charset=utf-8');
            } else if (filePath.endsWith('.png')) {
              res.setHeader('Content-Type', 'image/png');
            } else if (filePath.endsWith('.svg')) {
              res.setHeader('Content-Type', 'image/svg+xml');
            } else {
              res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            }
            return fs.createReadStream(filePath).pipe(res);
          }
          next();
        });
      },
    },
  ],
  base: process.env.GITHUB_PAGES ? '/codemarathon-rails/' : '/',
});
