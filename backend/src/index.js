const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();

mongoose.connect('mongoURL', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});

app.use(cors());

app.use(bodyParser.json());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'avatars')));

app.use(require('./routes'));

app.listen(8000, console.log('Listening on port 8000...'));
