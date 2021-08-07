require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

const { connectDB } = require('./db/db');
connectDB();

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

app.use('/api/logs', require('./routes/logs'));
app.use('/api/techs', require('./routes/techs'));
app.all('*', (req, res) => {
  res.status(404).json('page not found');
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`app running or port ${port}`));
