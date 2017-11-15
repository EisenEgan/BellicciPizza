const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const mongoose = require('mongoose');

const app = express();
app.use(cors())

var config = require('./config');
mongoose.connect(config.database);

require('./server/models/db.js')

// API file for interacting with MongoDB
const api = require('./server/routes/api');

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

// const users = require('./routes/users');


// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
//
// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
