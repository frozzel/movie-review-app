const { response } = require("express");

exports.getUpcomingMovies = async (req, res) => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.TMDB_READ_TOKEN
        }
      };
      
      const movie = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&region=us', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));

    


    res.json({results: "success"})
    }