const express = require("express");
const { getUpcomingMovies, getNowPlaying, getPopularMovies, getSingleMovie, getRelatedMovies } = require("../controllers/movie1");


const router = express.Router();

router.get("/upcoming", getUpcomingMovies);
router.get("/nowPlaying", getNowPlaying);
router.get("/popular", getPopularMovies);
router.get("/single/:movieId", getSingleMovie);
router.get("/related/:movieId", getRelatedMovies);

module.exports = router;