const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();

// const apiKey = process.env.API_KEY
const apiKey = b455153d3dd7059af03762bbe91dcf0a;
const url = "https://api.themoviedb.org/3/movie/";

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine','ejs');

// mongoose.connect("")

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/register", function(req, res) {
  res.render("register");
});

app.get("/login", function(req, res) {
  res.render("login");
});

app.post("/", function(req, res) {

  const query = req.body.movieName;
  const url = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=" + query;

  https.get(url, function(response) {
    let result = "";

    response.on("data", function(data){
      result += data;
    });
    response.on("end", function() {
      const moviesData = JSON.parse(result);
      const movies = moviesData.results;
      const posterUrl = "https://image.tmdb.org/t/p/w500";
      const movieUrl = "https://www.themoviedb.org/movie/";

      res.render("results", {
        movies: movies,
        posterUrl: posterUrl,
        movieUrl: movieUrl
      });
    })
  });

});

app.post("/register", function(req, res) {



});

app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
