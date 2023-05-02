const express = require("express");
const { isAuth, isAdmin, validate } = require("../utils/auth");
const { uploadVideo, uploadImage } = require("../utils/multer");
const { uploadTrailer, createMovie } = require("../controllers/movie");
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
module.exports = router;