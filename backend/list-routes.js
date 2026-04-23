const app = require('./src/app'); // Adjust this to point to your main Express app file
const listEndpoints = require('express-list-endpoints');

console.log(JSON.stringify(listEndpoints(app), null, 2));