const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

const displayRotationWindows = require('display-rotation-windows');

// Assuming the current display rotation is 0:

// Returns 0
displayRotationWindows.getRotation();

displayRotationWindows.rotate180();

// // Rotate the display counterclockwise, returns 90
// displayRotationWindows.rotateCCW();

// // Rotate the display 180 degrees, returns 180
// displayRotationWindows.rotate180();

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))