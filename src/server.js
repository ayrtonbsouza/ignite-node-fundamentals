/*
  For ES Modules, you need to use the following syntax:
*/

import http from 'node:http';

/*
  Remember that you need to use "node:" prefix to import modules from the node:core module.
*/

/*
  In case of using CommonJS in package.json type, you need to use the following syntax:
  const http = require('http');
*/

const server = http.createServer((request, response) => {
  return response.end('Hello World!');
});

server.listen(3333);
