import { loadMovie } from "../reducers/MovieSlice";
import axios from "../../utils/axios";
export { removeMovie } from "/src/store/reducers/MovieSlice";


export const asyncloadmovie = (id) => async (dispatch, getstate) => {
  try {
    const detail = await axios.get(`/movie/${id}`);
    const externalIds = await axios.get(`/movie/${id}/external_ids`);
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const watchProviders = await axios.get(`/movie/${id}/watch/providers`);
    let ultimatedetails = {
      detail: detail.data,
      externalIds: externalIds.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find(movie=>movie.type=="Trailer"),
      watchProviders: watchProviders.data.results.IN,
    };
    dispatch(loadMovie(ultimatedetails));

  } catch (error) {
    console.error("Error fetching movie details or related data", error);
  }
};
