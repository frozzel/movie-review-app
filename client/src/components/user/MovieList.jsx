import React from "react";
import { FaRadiation } from "react-icons/fa";
import { Link } from "react-router-dom";
// import { getPoster } from "../../utils/helper";
import GridContainer from "../GridContainer";

const trimTitle = (text = "") => {
  if (text.length <= 20) return text;
  return text.substring(0, 20) + "..";
};

export default function MovieList({ title, movies = [] }) {
  
  if (!movies.length) return null;

  return (
    <div>
      {title ? (
        <h1 className="text-2xl dark:text-white text-secondary font-semibold mb-5">
          {title}
        </h1>
      ) : null}
      <GridContainer>
        {movies.map((movie) => {
          return <ListItem key={movie.id} movie={movie} />;
        })}
      </GridContainer>
    </div>
  );
}

const ListItem = ({ movie }) => {
  const { id, title, backdrop_path, reviews , name} = movie;
  if (backdrop_path===null || backdrop_path===undefined){
    const  newScr = '/placeholder.png'
    return (
      <Link to={"/movie/" + id}>
        <img
          className="aspect-video object-cover w-full"
          src={newScr}
          alt={title}
        />
        <h1
          className="text-lg dark:text-white text-secondary font-semibold"
          title={title}
        >
          {trimTitle(title)}
        </h1>
        <h1
          className="text-lg dark:text-white text-secondary font-semibold"
          title={name}
        >
          {trimTitle(name)}
        </h1>
        {reviews?.ratingAvg ? (
          <p className="text-highlight dark:text-highlight-dark flex items-center space-x-1">
            <span>{reviews?.ratingAvg}</span>
            <FaRadiation />
          </p>
        ) : (
          <p className="text-highlight dark:text-highlight-dark">No reviews</p>
        )}
      </Link>
    );
  } else  if (backdrop_path){
    const newScr = "https://image.tmdb.org/t/p/original" + backdrop_path
  return (
    <Link to={"/movie/" + id}>
      <img
        className="aspect-video object-cover w-full"
        src={newScr}
        alt={title}
      />
      <h1
        className="text-lg dark:text-white text-secondary font-semibold"
        title={title}
      >
        {trimTitle(title)}
      </h1>
      <h1
        className="text-lg dark:text-white text-secondary font-semibold"
        title={name}
      >
        {trimTitle(name)}
      </h1>
      {reviews?.ratingAvg ? (
        <p className="text-highlight dark:text-highlight-dark flex items-center space-x-1">
          <span>{reviews?.ratingAvg}</span>
          <FaRadiation />
        </p>
      ) : (
        <p className="text-highlight dark:text-highlight-dark">No reviews</p>
      )}
    </Link>
  );}
};
