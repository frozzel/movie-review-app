const express = require("express");
const { getUpcomingMovies, getNowPlaying, getTopRatedTv } = require("../controllers/movie1");

const router = express.Router();

router.get("/upcoming", getUpcomingMovies);
router.get("/nowPlaying", getNowPlaying);
router.get("/topRatedTv", getTopRatedTv);

module.exports = router;