import React, { useState, useEffect } from "react";
import { getNowPlaying } from "../../api/movie1";
import { useNotification } from "../../hooks";
import MovieList from "./MovieList";

export default function TopRatedMovies() {
  const [movies, setMovies] = useState([]);
  const { updateNotification } = useNotification();

  const fetchMovies = async (signal) => {
    const { error, results } = await getNowPlaying(null, signal);
    if (error) return updateNotification("error", error);

    setMovies([...results]);
  };

  useEffect(() => {
    const ac = new AbortController();

    fetchMovies(ac.signal);
    return () => {
      ac.abort();
    };
  }, []);

  return <MovieList movies={movies} title="Now Playing (Movies)" />;
}
