const express = require("express");
const { isAuth, isAdmin } = require("../utils/auth");
const { uploadVideo } = require("../utils/multer");
const { uploadTrailer } = require("../controllers/movie");
const router = express.Router();

router.post('/upload-trailer', isAuth, isAdmin, uploadVideo.single('video'), uploadTrailer);


module.exports = router;