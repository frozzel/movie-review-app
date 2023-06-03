import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleTv } from "../../api/movie1";
import { useAuth, useNotification } from "../../hooks";
import Container from "../Container";
import CustomButtonLink from "../CustomButtonLink";
import AddRatingModal from "../models/AddRatingModal";
// import ProfileModal from "../models/ProfileModal";
import RatingStar from "../RatingStar";
import SimilarTv from "./SimilarTv";
import MovieReviews from "./MovieReviews";

const convertReviewCount = (count = 0) => {
  if (count <= 999) return count;

  return parseFloat(count / 1000).toFixed(2) + "k";
};

const convertDate = (date = "") => {
  return date.split("T")[0];
};

export default function SingleTv() {
  const [ready, setReady] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [movie, setMovie] = useState({});
  // const [showProfileModal, setShowProfileModal] = useState(false);
  // const [selectedProfile, setSelectedProfile] = useState({});

  const { movieId } = useParams();
  const { updateNotification } = useNotification();
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;
  
  const navigate = useNavigate();

  const fetchMovie = async () => {
    const { error, movie } = await getSingleTv(movieId);
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

  // const handleProfileClick = (profile) => {
  //   setSelectedProfile(profile);
  //   setShowProfileModal(true);
  // };

  // const hideProfileModal = () => {
  //   setShowProfileModal(false);
  // };

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
    reviews = {},
    genres = [],
  } = movie;
 
  const newScr = "https://image.tmdb.org/t/p/original" + backdrop_path
  
  return (
    <div className="dark:bg-primary bg-white min-h-screen pb-10">
      <Container className="xl:px-0 px-2">
        <img className="" src={newScr} alt=""></img>
        <div className="flex justify-between">
          <h1 className="xl:text-4xl lg:text-3xl text-2xl  text-highlight dark:text-highlight-dark font-semibold py-3">
            {title}
          </h1>
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
          {/* <ListWithLabel label="Director:">
            <CustomButtonLink
              onClick={() => handleProfileClick(director)}
              label={director.name}
            />
          </ListWithLabel>

          <ListWithLabel label="Writers:">
            {writers.map((w) => (
              <CustomButtonLink
                onClick={() => handleProfileClick(w)}
                key={w.id}
                label={w.name}
              />
            ))}
          </ListWithLabel>

          <ListWithLabel label="Lead Actor:">
            {cast.map(({ id, profile, leadActor }) => {
              return leadActor ? (
                <CustomButtonLink
                  onClick={() => handleProfileClick(profile)}
                  label={profile.name}
                  key={id}
                />
              ) : null;
            })}
          </ListWithLabel> */}

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

          <SimilarTv movieId={movieId} />
        </div>
      </Container>

      {/* <ProfileModal
        visible={showProfileModal}
        onClose={hideProfileModal}
        profileId={selectedProfile.id}
      /> */}

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

// const CastProfiles = ({ cast, onProfileClick }) => {
//   return (
//     <div className="">
//       <h1 className="text-light-subtle dark:text-dark-subtle font-semibold text-2xl mb-2">
//         Cast:
//       </h1>
//       <div className="flex flex-wrap space-x-4">
//         {cast.map(({ id, profile, roleAs }) => {
//           return (
//             <div
//               key={id}
//               className="basis-28 flex flex-col items-center text-center mb-4"
//             >
//               <img
//                 className="w-24 h-24 aspect-square object-cover rounded-full"
//                 src={profile.avatar}
//                 alt=""
//               />

//               <CustomButtonLink label={profile.name} />
//               <span className="text-light-subtle dark:text-dark-subtle text-sm">
//                 as
//               </span>
//               <p className="text-light-subtle dark:text-dark-subtle">
//                 {roleAs}
//               </p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };
