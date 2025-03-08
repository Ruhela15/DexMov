import axios from "../../utils/axios";
export { removeTv } from "../reducers/TvSlice";
import { loadTv } from "../reducers/TvSlice";


export const asyncloadTv = (id) => async (dispatch, getstate) => {
  try {
    const detail = await axios.get(`/tv/${id}`);
    const externalIds = await axios.get(`/tv/${id}/external_ids`);
    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const watchProviders = await axios.get(`/tv/${id}/watch/providers`);
    let ultimatedetails = {
      detail: detail.data,
      externalIds: externalIds.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find(Tv=>Tv.type=="Trailer"),
      watchProviders: watchProviders.data.results.IN,
    };
    dispatch(loadTv(ultimatedetails));

  } catch (error) {
    console.error("Error fetching movie details or related data", error);
  }
};