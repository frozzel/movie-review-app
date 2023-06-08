const { isValidObjectId } = require("mongoose");
const Movie = require("../models/movie");
const Review = require("../models/review");
const { sendError } = require("../utils/helper");
const { getAverageRatings } = require("../utils/helper");



exports.addReview = async (req, res) => {
  const { movieId } = req.params;
  const { content, rating, CRT,
    LGBTQ_content,
    trans_content,
    anti_religion,
    globalWarming,
    leftWing } = req.body;
  const userId = req.user._id;
  const movie = await Movie.findOne({ TMDB_Id: movieId });

  if (!req.user.isVerified) return sendError(res, "Please verify you email first!");

  if(!movie){
    const newMovie = new Movie({TMDB_Id: movieId});
  
    await newMovie.save();
  } else if(movie) {

  const isAlreadyReviewed = await Review.findOne({
    owner: userId,
    parentMovie: movie._id,
  });
  if (isAlreadyReviewed)
    return sendError(res, "Invalid request, review is already there!");

  // create and update review.
  const newReview = new Review({
    owner: userId,
    parentMovie: movie._id,
    content,
    rating,
    CRT,
    LGBTQ_content,
    trans_content,
    anti_religion,
    globalWarming,
    leftWing

  });

  // updating review for movie.
  movie.reviews.push(newReview._id);
  await movie.save();

  // saving new review
  await newReview.save();

  const reviews = await getAverageRatings(movie._id);

  res.json({ message: "Your review has been added.", reviews });
  }
};

exports.updateReview = async (req, res) => {
    const { reviewId } = req.params;
    const { content, rating, CRT, LGBTQ_content, trans_content, anti_religion, globalWarming, leftWing} = req.body;
    const userId = req.user._id;
  
    if (!isValidObjectId(reviewId)) return sendError(res, "Invalid Review ID!");
  
    const review = await Review.findOne({ owner: userId, _id: reviewId });
    if (!review) return sendError(res, "Review not found!", 404);
  
    review.content = content;
    review.rating = rating;
    review.CRT = CRT;
    review.LGBTQ_content = LGBTQ_content;
    review.trans_content= trans_content;
    review.anti_religion = anti_religion;
    review.globalWarming = globalWarming;
    review.leftWing = leftWing;

    await review.save();
  
    res.json({ message: "Your review has been updated." });
  };

exports.removeReview = async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.user._id;

  if (!isValidObjectId(reviewId)) return sendError(res, "Invalid review ID!");

  const review = await Review.findOne({ owner: userId, _id: reviewId });
  if (!review) return sendError(res, "Invalid request, review not found!");

  const movie = await Movie.findById(review.parentMovie).select("reviews");
  console.log(movie.reviews);
  movie.reviews = movie.reviews.filter((rId) => rId.toString() !== reviewId);
  console.log(movie.reviews);
  await Review.findByIdAndDelete(reviewId);

  await movie.save();

  res.json({ message: "Review removed successfully." });
  };

exports.getReviewsByMovie = async (req, res) => {
  const { movieId } = req.params;

  // if (!isValidObjectId(movieId)) return sendError(res, "Invalid movie ID!");
  
  const movie = await Movie.findOne({ TMDB_Id: movieId })
      .populate({
      path: "reviews",
      populate: {
        path: "owner",
        select: "name",
      },
      
    })
    .select("reviews title");

    if (!movie) return null;
  
    

  const reviews = movie.reviews.map((r) => {
    const { owner, content, rating, CRT,
      LGBTQ_content,
      trans_content,
      anti_religion,
      globalWarming,
      leftWing, _id: reviewID } = r;
    const { name, _id: ownerId } = owner;

    return {
      id: reviewID,
      owner: {
        id: ownerId,
        name,
      },
      content,
      rating,
      CRT,
      LGBTQ_content,
      trans_content,
      anti_religion,
      globalWarming,
      leftWing
    };
  });
  
  res.json({ movie: { reviews, title: movie.title } });
};