const express = require('express');
const axios = require('axios');
const router = express.Router();
const fs = require('fs');
var http = require("https");
const path = require("path");

const dbPath = path.join(__dirname, "../db.json");

const db = JSON.parse(fs.readFileSync(dbPath), "utf8");

function DBsave(films) {
  const lastFilms = db.films;
  const allFilms = [...lastFilms, ...films]; // db.articles.concat(data)
  const newData = { films: allFilms };
  const String = JSON.stringify(newData);

  fs.writeFileSync(dbPath, String, "utf8");
}

/* GET launcher. */
router.get('/', function(req, res, next) {
  res.render('launcher', { section: 'launcher', title: 'Film-reader' });
});

/* GET feed. */
router.get('/index', async function(req, res) {

  urlToQuery = 'https://api.themoviedb.org/3/movie/top_rated';

  const films = await axios.get(urlToQuery, {
    params: {
      languaje: 'es-ES',
      api_key: 'a65003174727ec3bcd82daaacb854f98'
    }
  })
  .catch(e => res.status(500).send('error'));

  console.log(films);
  const totalFilms = films.data.results.map(film => ({
    ...film,
    id: film.id,
    rating: 0,
    fav: false
  }));

  const filmsFiltered = totalFilms.filter(item => {
    const check = db.films.find(art => art.url === item.url);
    return !Boolean(check);
  });

  // Pinto en pantalla todos los que me vienen

  // Guardo solo los que no tenía guardados antes
  res.render('feed', { 
    section: 'catalogo', 
    title: 'Catálogo', 
    films: films.data
    }
  );

  DBsave(filmsFiltered);

});


router.get("/detail/:id", async function(req, res) {
  const param = req.params.id;
  const film = db.films.find(item => item.id === param);

  res.render("detail", { title: "Film Catalog | Detail", film });
});


router.get("/favs", (req, res) => {
  const favFilms = db.films.filter(item => item.fav === true);
  const filter = req.query.category;
  const favFilmsFiltered = favFilms.filter(
    item => item.category === filter
  );
  const filmsToShow = filter ? favFilmsFiltered : favFilms;

  res.render("feed", {
    title: "NewsReader | Favoritos",
    noticias: filmsToShow,
    isFavsPage: true
  });
});

function formatDate(format, date) {
  date = new Date(date);

  format = format.split("Y").join(date.getFullYear());
  format = format.split("m").join(("0" + (date.getMonth() + 1)).slice(-2));
  format = format.split("d").join(("0" + date.getDate()).slice(-2));

  return format;
}


module.exports = router;
