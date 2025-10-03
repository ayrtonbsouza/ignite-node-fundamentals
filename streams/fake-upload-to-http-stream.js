import { Readable } from 'node:stream';

/*
  On this file we're going to create a stream that reads from 1 to 100 and writes it to the response.
*/

class OneToHundredStream extends Readable {
  index = 1;
  _read() {
    const i = this.index++;
    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buffer = Buffer.from(String(i) + '\n');
        this.push(buffer);
      }
    }, 1000);
  }
}

/*
  Making a fake upload to the http stream.
*/

fetch('http://localhost:3334', {
  method: 'POST',
  body: new OneToHundredStream(),
  duplex: 'half',
});
