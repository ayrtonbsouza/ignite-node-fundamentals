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

import { Readable } from 'node:stream';

class OneToHundredStream extends Readable {
  index = 1;
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
new OneToHundredStream().pipe(process.stdout);
