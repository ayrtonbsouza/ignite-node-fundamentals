/*
  Streams are a way to handle data in a more efficient way.
  It was created to handle large amounts of data in a more efficient way.
  This problem was a issue to other programming languages like Java and Python.

  It's divided into two types:
  - Readable: a stream that can be read.
  - Writable: a stream that can be written.

  We can use the stream to read a file or write a file.
  We can use the stream to read a network request or write a network response.
  We can use the stream to read a socket or write a socket.
  We can use the stream to read a pipe or write a pipe.

  It's important to understand that every process in the Node.js is a stream.
*/


/*
  The example below is basicly a way to read the input from the user and write it to the output.

  process.stdin
    .pipe(process.stdout)
*/

import { Readable, Writable, Transform } from 'node:stream';

class OneToHundredStream extends Readable {
  index = 1;
  /*
    This is a method that is called when the stream is read.
    We need to implement the _read method to read the data from the stream.
  */
  _read() {
    const i = this.index++;
    setTimeout(() => {
      if (i > 100) {
        /*
          This is a way to stop the stream.
        */
        this.push(null);
      } else {
        /*
          This is a way to convert the number to a string and then to a buffer.
        */
        const buffer = Buffer.from(String(i) + '\n');
        /*
          This is a way to push the data to the stream.
        */
        this.push(buffer);
      }
    }, 1000);
  }
}

/*
  This is a way to pipe the stream to the stdout.
*/
// new OneToHundredStream().pipe(process.stdout);

class MultiplyByTenStream extends Writable {
  /*
     On the same way as the Readable stream, we need to implement the _write method.
     The _write method is a method that is called when the stream is written.
     We get three parameters:
     - chunk: the chunk of data that is being written.
     - encoding: the encoding of the data that is being written.
     - callback: a function that is called when the write is complete.
  */

  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

/*
  On the code below, we're going to pipe the stream to the stdout.
*/

// new OneToHundredStream().pipe(new MultiplyByTenStream())

/*
  Now we're going to develop a transformation stream.
  A transformation stream is a stream that transforms the data from the readable stream to the writable stream.
  We're going to use the Transform stream to transform the data from the readable stream to the writable stream.
  The Transform stream is a subclass of the Readable and Writable stream.
  The Transform stream is a subclass of the Duplex stream.
  The Duplex stream is a subclass of the Stream.
  The Stream is a subclass of the EventEmitter.
*/

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    /*
      This is a way to transform the data from the readable stream to the writable stream.
      We need to call the callback function to signal that the transformation is complete.
      We need to pass the error as the first parameter and the transformed data as the second parameter.
    */
    callback(null, Buffer.from(String(transformed)));
  }
}

new OneToHundredStream()
      .pipe(new InverseNumberStream())
      .pipe(new MultiplyByTenStream())

/*
  There is a final stream type called Duplex. This stream is a combination of the Readable and Writable stream.
  We're not going to implement this stream because it's not a common stream type, but it's important to know about it.
*/
