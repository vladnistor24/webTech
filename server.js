// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const config = require('./config');
const routes = require('./routes/index');

const app = express();

// Enable CORS
app.use(cors());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Serve static files
app.use(express.static('public'));

// Use routes
app.use('/api', routes);

// Additional route for serving auth.html
app.get('/auth', (req, res) => {
  res.sendFile('auth.html', { root: 'public' });
});

// Serve the index.html file for the root path
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

const PORT = process.env.PORT || 5004;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
