const express = require("express");
const {
  createActor,
  updateActor,
  removeActor,
  searchActor,
  getLatestActors,
  getSingleActor,
} = require("../controllers/actor");
const { uploadImage } = require("../utils/multer");
const { actorInfoValidator, validate, isAuth, isAdmin } = require("../utils/auth");

const router = express.Router();

router.post(
  "/create",
  isAuth,
  isAdmin,
  uploadImage.single("avatar"),
  actorInfoValidator,
  validate,
  createActor
);

router.post(
  "/update/:actorId",
  isAuth,
  isAdmin,
  uploadImage.single("avatar"),
  actorInfoValidator,
  validate,
  updateActor
);

router.delete("/:actorId", removeActor,isAuth, isAdmin,);
router.get("/search", searchActor, isAuth, isAdmin);
router.get("/latest-uploads", getLatestActors, isAuth, isAdmin);
router.get("/single/:id", getSingleActor);

module.exports = router;