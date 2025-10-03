import http from 'node:http';
import { Transform } from 'node:stream';

/*
  On this we're going to use the stream to read the fake data stream and write it to the response.
*/

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    console.log(transformed);
    callback(null, Buffer.from(String(transformed)));
  }
}

/*
  Our request is a readable stream and our response is a writable stream.
  We need to use the Transform stream to transform the data from the readable stream to the writable stream.
*/

const server = http.createServer((request, response) => {
  return request.pipe(new InverseNumberStream()).pipe(response);
});

server.listen(3334);
