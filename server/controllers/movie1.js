const fetch = require('node-fetch');

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
exports.getTopRatedTv = async (req, res) => {
    const url = 'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1';
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