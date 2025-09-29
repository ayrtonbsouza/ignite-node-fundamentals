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
  const { method, url } = request;

  /*
    Methods are a semantic way to identify the type of request.

    GET => retrieve data from the server.
    POST => send data to the server.
    PUT => update data from a domain on the server.
    DELETE => delete data from the server.
    PATCH => update one specific data from a domain on the server.
  */

  if (method === 'GET' && url === '/users') {
    return response.end('List of users');
  }
  if (method === 'POST' && url === '/users') {
    return response.end('Create a user');
  }
  if (method === 'PUT' && url === '/users') {
    return response.end('Update a user data as a whole');
  }
  if (method === 'DELETE' && url === '/users') {
    return response.end('Delete a user');
  }
  if (method === 'PATCH' && url === '/users') {
    return response.end('Update a specific data from a user');
  }

  return response.end('Hello World!');
});

server.listen(3333);
