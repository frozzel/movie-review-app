const express = require("express");
const { getUpcomingMovies } = require("../controllers/movie1");

const router = express.Router();

router.get("/upcoming", getUpcomingMovies);

module.exports = router;