const fetch = require('node-fetch');
const { sendError, getAverageRatings } = require('../utils/helper');
const Review = require("../models/review");
const { averageRatingPipeline } = require("../utils/helper");



exports.getUpcomingMovies = async (req, res) => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.TMDB_READ_TOKEN
        }
      };
    try{
      const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&region=us', options);
    
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.log(error);
    }
    
}
exports.getNowPlaying = async (req, res) => {
    const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&region=us';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: process.env.TMDB_READ_TOKEN
      }
    };
    try{
      const response = await fetch(url, options);
   
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.log(error);
    }
}
exports.getPopularMovies = async (req, res) => {
    const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: process.env.TMDB_READ_TOKEN
      }
    };

    try{
      const response = await fetch(url, options);
   
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.log(error);
    }
}

exports.getSingleMovie = async (req, res) => {
  const {movieId} = req.params;
  const url = 'https://api.themoviedb.org/3/movie/' +movieId+ '?language=en-US';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.TMDB_READ_TOKEN
    }
  };
  try{
    const response = await fetch(url, options)
    const movie = await response.json();

    const [aggregatedResponse] = await Review.aggregate(
      averageRatingPipeline(movieId)
    );
  
    const reviews = {};
  
    if (aggregatedResponse) {
      const { ratingAvg, reviewCount } = aggregatedResponse;
      reviews.ratingAvg = parseFloat(ratingAvg).toFixed(1);
      reviews.reviewCount = reviewCount;
    }
    const {
      id,
      title,
      overview,
      release_date,
      genres,
      original_language,
      backdrop_path,
      
    } = movie;

    res.json({
      movie: {
        id,
        title,
        overview,
        release_date,
        genres: genres.map((g) => g.name),
        original_language,
        backdrop_path,
        reviews: { ...reviews },
      },
    });
    } catch (error) {
      console.log(error);
      return sendError(res, "Movie id is not valid!"); 
    }
}

exports.getRelatedMovies = async (req, res) => {
  const {movieId} = req.params;
  const url = 'https://api.themoviedb.org/3/movie/' +movieId+ '/recommendations?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.TMDB_READ_TOKEN
    }
  };
  try{
    const response = await fetch(url, options)
    const movie = await response.json();
    const mapMovies = async (m) => {
      const reviews = await getAverageRatings(m.id);
  
      return {
        id: m.id,
        title: m.title,
        backdrop_path: m.backdrop_path,
        reviews: { ...reviews },
      };
    };
    const relatedMovies = await Promise.all(movie.results.slice(1, 6).map(mapMovies));
  
    res.json({ movies: relatedMovies });
    } catch (error) {
      console.log(error);
      return sendError(res, "Movie id is not valid!"); 
    }
}