import { catchError} from "../utils/helper";
import client from "./client";

export const getUpcomingMovies = async () => {
 
    try {
      const { data } = await client("/movie1/upcoming");
      
      return data;
      
    } catch (error) {
      return catchError(error);
    }
  };
  export const getNowPlaying = async () => {
 
    try {
      const { data } = await client("/movie1/nowPlaying");
      
      return data;
      
    } catch (error) {
      return catchError(error);
    }
  };

  export const getTopRatedTv = async () => {
    try {
        const { data } = await client("/movie1/topRatedTv");
        
        return data;
        
      } catch (error) {
        return catchError(error);
      }
    };