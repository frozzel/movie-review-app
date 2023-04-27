const express = require("express");
const { createActor } = require("../controllers/actor");
const { uploadImage } = require("../utils/multer");
const { actorInfoValidator, validate } = require("../utils/auth");

const router = express.Router();

router.post(
  "/create",
  uploadImage.single("avatar"),
  actorInfoValidator,
  validate,
  createActor
);

module.exports = router;