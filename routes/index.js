var express = require('express');
var router = express.Router();
const fetch = require('node-fetch'); // Import the 'fetch' function

/* GET home page. */
router.get('/', async function(req, res) {
  res.send({ title: 'Express' });
  // res.render('index', { title: 'Express' });
});

/* Fetch data from external API */
const apiUrl = "http://makeup-api.herokuapp.com/api/v1/products.json";

router.get('/fetch-data', async function(req, res) {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

module.exports = router;
