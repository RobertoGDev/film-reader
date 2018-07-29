var express = require('express');
var router = express.Router();

/* GET launcher. */
router.get('/', function(req, res, next) {
  res.render('launcher', { section: 'launcher', title: 'Film-reader' });
});

/* GET feed. */
router.get('/index', function(req, res, next) {
  res.render('index', { section: 'catalogo', title: 'Catálogo' });
});

/* GET feed. */
router.get('/films', function(req, res, next) {
  res.render('index', { section: 'films', title: 'Films' });
});

/* GET feed. */
router.get('/tv', function(req, res, next) {
  res.render('index', { section: 'tv', title: 'Series' });
});

module.exports = router;
