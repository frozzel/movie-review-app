import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleMovie } from "../../api/movie1";
import { useAuth, useNotification } from "../../hooks";
import Container from "../Container";
import CustomButtonLink from "../CustomButtonLink";
import AddRatingModal from "../models/AddRatingModal";
import RatingStar from "../RatingStar";
import RelatedMovies from "../RelatedMovies";
import MovieReviews from "./MovieReviews";
import ReactPlayer from 'react-player'
import TopRatedTVSeries from "./TopRatedTVSeries";
import GaugeChart from 'react-gauge-chart'


const convertReviewCount = (count = 0) => {
  if (count <= 999) return count;

  return parseFloat(count / 1000).toFixed(2) + "k";
};

const convertDate = (date = "") => {
  return date.split("T")[0];
};
let chartStyle = {};
const w = window.innerWidth;
if (w < 768) {
  chartStyle = {
    width: '120px',
    
  };
} else {
  chartStyle = {
    width: '200px',
  }
  };
let theme = localStorage.getItem('theme');


export default function SingleMovie() {
  const [ready, setReady] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [movie, setMovie] = useState({});

  const { movieId } = useParams();
  const { updateNotification } = useNotification();
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;

  const navigate = useNavigate();

  const fetchMovie = async () => {
    const { error, movie } = await getSingleMovie(movieId);
    if (error) return updateNotification("error", error);

    setReady(true);
    setMovie(movie);
  };

  const handleOnRateMovie = () => {
    if (!isLoggedIn) return navigate("/auth/signIn");
    setShowRatingModal(true);
  };

  const hideRatingModal = () => {
    setShowRatingModal(false);
  };



  const handleOnRatingSuccess = (reviews) => {
    setMovie({ ...movie, reviews: { ...reviews } });
  };

  useEffect(() => {
    if (movieId) fetchMovie();
  }, [movieId]);

  if (!ready)
    return (
      <div className="h-screen flex justify-center items-center dark:bg-primary bg-white">
        <p className="text-light-subtle dark:text-dark-subtle animate-pulse">
          Please wait
        </p>
      </div>
    );

  const {
    id,
    backdrop_path,
    title,
    overview,
    original_language,
    release_date,
    trailer,
    trailer2,
    trailer3,
    reviews = {},
    genres = [],
  } = movie;

  let imgCheck = false;
  const newScr = "https://image.tmdb.org/t/p/original" + backdrop_path
  if (reviews.ratingAvg > 0) imgCheck = true;
  
  return (
    <div className="dark:bg-primary bg-white min-h-screen pb-10">
      <Container className="xl:px-0 px-2">
        <div className="w-full flex">
        <div className="md:w-4/5 w-full aspect-video relative overflow-hidden">
              {newScr ? ( <img className="" src={newScr} alt=""></img>
              ) : null}
              {imgCheck ?  (<img src="./logo.png" alt="logo" className="absolute  inset-3 flex flex-col items-end w-16 md:w-32 lg:w-48" />): null}
              {title ? (
              <div className="absolute inset-0 flex flex-col justify-end py-0 md:py-2 lg:py-3 bg-gradient-to-t from-white via-transparent dark:from-primary dark:via-transparent">
                <h1 className="font-semibold text-lg md:text-2xl lg:text-4xl dark:text-highlight-dark text-highlight"> 
                  {title}
                </h1>
              </div>
            ) : null}
        </div>
          <div className="w-1/5 md:block hidden space-y-3 px-3">
              <h1 className="font-semibold text-2xl text-primary dark:text-white">
                Trailers
              </h1>
              <ReactPlayer height="" width="" className='aspect-video object-cover rounded' controls={true} light={true} url={trailer}  playing/>
              <ReactPlayer height="" width="" className='aspect-video object-cover rounded' controls={true} light={true} url={trailer2}  playing/>
              <ReactPlayer height="" width="" className='aspect-video object-cover rounded' controls={true} light={true} url={trailer3}  playing/>
          </div>
        </div>  

        <div className="flex justify-between">
        <div className="flex flex-col ">
        <GaugeChart id="gauge-chart2" style={chartStyle} textColor={theme === 'dark' ? 'white' : '#000'}  needleColor={theme === 'dark' ? '#adadad' : '#DC143C'} needleBaseColor={theme === 'dark' ? '#adadad' : '#DC143C'}
              nrOfLevels={20}
              arcsLength={[0.1, 0.6, 0.3]}
              colors={['#5BE12C', '#F5CD19', '#DC143C']}
              percent={reviews.ratingAvg/10}
              arcPadding={0.02}
            />
        </div>
    
          <div className="flex flex-col items-end">
            <RatingStar rating={reviews.ratingAvg} />
            <CustomButtonLink
              label={convertReviewCount(reviews.reviewCount) + " Reviews"}
              onClick={() => navigate("/movie/reviews/" + id)}
            />
            <CustomButtonLink
              label="Rate the movie"
              onClick={handleOnRateMovie}
            />
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-light-subtle dark:text-dark-subtle">{overview}</p>


          <ListWithLabel label="Language:">
            <CustomButtonLink label={original_language} clickable={false} />
          </ListWithLabel>

          <ListWithLabel label="Release Date:">
            <CustomButtonLink
              label={convertDate(release_date)}
              clickable={false}
            />
          </ListWithLabel>

          <ListWithLabel label="Genres:">
            {genres.map((g) => (
              <CustomButtonLink label={g} key={g} clickable={false} />
            ))}
          </ListWithLabel>

          <RelatedMovies movieId={movieId} />
          <TopRatedTVSeries movieId={movieId} />
        </div>
      </Container>

      <AddRatingModal
        visible={showRatingModal}
        onClose={hideRatingModal}
        onSuccess={handleOnRatingSuccess}
      />
      <MovieReviews movieId={movieId} />
    </div>
  );
}

const ListWithLabel = ({ children, label }) => {
  return (
    <div className="flex space-x-2">
      <p className="text-light-subtle dark:text-dark-subtle font-semibold">
        {label}
      </p>
      {children}
    </div>
  );
};

