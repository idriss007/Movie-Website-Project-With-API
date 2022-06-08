const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();

const apiKey = process.env.API_KEY
const url = "https://api.themoviedb.org/3/movie/";

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine','ejs');

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/test", function(req, res) {
  res.render("test");
});

app.post("/", function(req, res) {

  const query = req.body.movieName;
  const url = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=" + query;

  https.get(url, function(response) {
    response.on("data", function(data){
      const moviesData = JSON.parse(data);
      const movies = moviesData.results;
      const posterUrl = "https://image.tmdb.org/t/p/w500";
      const movieUrl = "https://www.themoviedb.org/movie/";

      res.render("results", {
        movies: movies,
        posterUrl: posterUrl,
        movieUrl: movieUrl
      });
    });
  });

});

app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
