const express = require('express');
const sse = require('./serverSideEvents.js');

const app = express();

app.use(express.static('public/views'));
app.use(express.static('public/'));

app.listen(3000, () => console.log('Listening on port 3000...'));

/**
 * Routes
 */

// Server-Side Events
app.get('/sse/registerCryptoUpdates', sse.register);
