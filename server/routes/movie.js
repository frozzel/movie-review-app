const express = require("express");
const { isAuth, isAdmin, validate } = require("../utils/auth");
const { uploadVideo, uploadImage } = require("../utils/multer");
const { uploadTrailer, createMovie, updateMovieWithoutPoster, updateMovieWithPoster, removeMovie, getMovies } = require("../controllers/movie");
const { parseData } = require("../utils/helper");
const { validateMovie } = require("../utils/validator");
const router = express.Router();

router.post(
    "/upload-trailer",
    isAuth,
    isAdmin,
    uploadVideo.single("video"),
    uploadTrailer
  );
  router.post(
    "/create",
    isAuth,
    isAdmin,
    uploadImage.single("poster"),
    parseData,
    validateMovie,
    validate,
    createMovie
  );

  router.patch(
    "/update-movie-without-poster/:movieId",
    isAuth,
    isAdmin,
    // parseData,
    validateMovie,
    validate,
    updateMovieWithoutPoster
  );
  router.patch(
    "/update-movie-with-poster/:movieId",
    isAuth,
    isAdmin,
    uploadImage.single("poster"),
    parseData,
    validateMovie,
    validate,
    updateMovieWithPoster
  );

  router.delete("/:movieId",
    isAuth,
    isAdmin,
    removeMovie);

  router.get("/movies", isAuth, isAdmin, getMovies);

module.exports = router;