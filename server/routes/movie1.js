const express = require("express");
const { getUpcomingMovies, getNowPlaying, getPopularMovies, getSingleMovie, getRelatedMovies, searchMovies } = require("../controllers/movie1");


const router = express.Router();

router.get("/upcoming", getUpcomingMovies);
router.get("/nowPlaying", getNowPlaying);
router.get("/popular", getPopularMovies);
router.get("/single/:movieId", getSingleMovie);
router.get("/related/:movieId", getRelatedMovies);
router.get("/search-public", searchMovies);

module.exports = router;