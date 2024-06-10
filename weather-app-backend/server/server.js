const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/weatherApp');


const searchSchema = new mongoose.Schema({
  city: String,
  country: String,
  temperature: Number,
  condition: String,
  conditionText: String,
  icon: String,
  date: { type: Date, default: Date.now },
});

const Search = mongoose.model('Search', searchSchema);

app.post('/api/search', async (req, res) => {
  try {
    const search = new Search(req.body);
    await search.save();
    res.status(201).send(search);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
