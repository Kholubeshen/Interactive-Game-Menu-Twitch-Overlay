const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

let turnOffDisplay = require("turn-off-display");
try {
    turnOffDisplay();
}
catch (err) {
    // handle error
    console.log(err);
}

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))