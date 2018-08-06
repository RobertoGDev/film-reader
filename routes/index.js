const express = require('express');
const axios = require('axios');
const router = express.Router();
var http = require("https");

/* GET launcher. */
router.get('/', function(req, res, next) {
  res.render('launcher', { section: 'launcher', title: 'Film-reader' });
});

/* GET feed. */
router.get('/index', async function(req, res) {

  urlToQuery = 'https://api.themoviedb.org/3/movie/top_rated';

  const movies = await axios.get(urlToQuery, {
    params: {
      languaje: 'es-ES',
      api_key: 'a65003174727ec3bcd82daaacb854f98'
    }
  })
  .catch(e => res.status(500).send('error'));

  res.render('feed', { 
    section: 'catalogo', 
    title: 'Catálogo', 
    movies: movies.data
    }
  );
});


module.exports = router;
