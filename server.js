// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const config = require('./config');
const routes = require('./routes/index');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

app.use(express.static('public'));

app.use('/api', routes);

app.get('/auth', (req, res) => {
  res.sendFile('auth.html', { root: 'public' });
});

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

const PORT = process.env.PORT || 5004;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
