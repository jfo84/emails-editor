const connect = require('connect');
const http = require('http');
const gzipStatic = require('connect-gzip-static');

const app = connect();
const port = process.env.PORT || 3000;
const publicPath = '/dist';

app.use(gzipStatic(__dirname + publicPath));

const server = http.createServer(app);

server.listen({
  port,
  host: '0.0.0.0',
}, () => console.log(`Listening to ${publicPath} on port ${port}`));