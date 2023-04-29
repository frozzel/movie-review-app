const express = require("express");
const { isAuth, isAdmin } = require("../utils/auth");
const { uploadVideo, uploadImage } = require("../utils/multer");
const { uploadTrailer, createMovie } = require("../controllers/movie");
const router = express.Router();

router.post('/upload-trailer', isAuth, isAdmin, uploadVideo.single('video'), uploadTrailer);
router.post('/create', isAuth, isAdmin, uploadImage.single('poster'), createMovie);


module.exports = router;