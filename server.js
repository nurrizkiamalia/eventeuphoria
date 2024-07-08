const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const next = require('next');

const devProxy = {
  '/api': {
    target: 'https://mini-project.fly.dev/api/v1',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '',
    },
  },
};

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  Object.keys(devProxy).forEach(function (context) {
    server.use(context, createProxyMiddleware(devProxy[context]));
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
