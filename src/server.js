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


/*
  In order to create a stateful application, we're going to create a variable to store the users.
*/

const users = [];

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

  /*
    We need to use Headers to identify the type of content we're sending or receiving from the client.
    There are a few types of headers:
    - Content-Type: identifies the type of content we're sending or receiving from the client.
    - Content-Length: identifies the length of the content we're sending or receiving from the client.
    - Accept: identifies the type of content the client accepts.
    - Authorization: identifies the type of authorization the client uses.
    - Cookie: identifies the type of cookie the client uses.
    - Set-Cookie: identifies the type of cookie the server sets.

    You can see the full list of headers in the following link: https://developer.mozilla.org/en-US/docs/Web/API/Headers
  */

  if (method === 'GET' && url === '/users') {
    return response
      .setHeader('Content-Type', 'application/json')
      .end(JSON.stringify(users));
  }
  if (method === 'POST' && url === '/users') {
    users.push({
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
    });
    return response.end('User created');
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
