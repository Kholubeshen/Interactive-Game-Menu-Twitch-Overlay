const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

// 'use strict';

// const ioHook = require('iohook');

// ioHook.on('mousemove', event => {
//   console.log(event); // { type: 'mousemove', x: 700, y: 400 }
// });

// // Register and start hook
// ioHook.start();

// // Alternatively, pass true to start in DEBUG mode.
// ioHook.start(true);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
