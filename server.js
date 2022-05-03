import express from 'express';
import sse from './serverSideEvents.js';
import db from './database.js';

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json()); // For parsing application/json request body

app.use(express.static('public/views'));
app.use(express.static('public/'));

app.listen(port, () => console.log(`Listening on port ${port}...`));

/**
 * Routes
 */

// Player handling
app.get('/player/:playername', db.getPlayer);

app.post('/player/', db.savePlayer);

app.put('/player/:playername', db.updatePlayer);

// Server-Side Events
app.get('/sse/registerCryptoUpdates', sse.register);
