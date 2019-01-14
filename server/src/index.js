
// Главный файл сервера

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('../config/config');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(require('./routes/routes'))

mongoose.Promise = global.Promise;

// Turn on our server

mongoose.connect(config.dbURL, config.dbOptions);

mongoose.connection
  .once('open', () => {
    console.log(`Mongoose - successful connection ...`)
    app.listen(process.env.PORT || config.port,
      () => console.log(`Server start on port ${config.port} ...`))
  })
  .on('error', error => console.warn(error))