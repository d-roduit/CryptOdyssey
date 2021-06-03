const express = require('express');
const sse = require('./serverSideEvents.js');
const db = require('./database.js');

const app = express();

app.use(express.json()); // For parsing application/json request body

app.use(express.static('public/views'));
app.use(express.static('public/'));

app.listen(3000, () => console.log('Listening on port 3000...'));

/**
 * Routes
 */

// Player handling
app.get('/player/:playername', db.getPlayer);

app.post('/player/', db.savePlayer);

app.put('/player/:playername', db.updatePlayer);

// Server-Side Events
app.get('/sse/registerCryptoUpdates', sse.register);
