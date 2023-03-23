import axiosClient from "../axios/axios.clien.jst";
import tmdbEndpoints from "./tmdb.endponts";

const tmdbApi = {
  mediaList: async ({ mediaType, mediaCategory, page }) =>
    await axiosClient.get(
      tmdbEndpoints.medalist({ mediaType, mediaCategory, page })
    ),
  mediaDetails: async ({ mediaType, mediaId }) =>
    await axiosClient.get(tmdbEndpoints.mediaDetails({ mediaType, mediaId })),
  mediaGenrer: async ({ mediaType }) =>
    await axiosClient.get(tmdbEndpoints.mediaGenrer({ mediaType })),
  mediaCredits: async ({ mediaType, mediaId }) =>
    await axiosClient.get(tmdbEndpoints.mediaCredits({ mediaType, mediaId })),
  mediaVideos: async ({ mediaType, mediaId }) =>
    await axiosClient.get(tmdbEndpoints.mediaVideos({ mediaType, mediaId })),
  mediaRecommend: async ({ mediaType, mediaId }) =>
    await axiosClient.get(tmdbEndpoints.mediaRecommend({ mediaType, mediaId })),
  mediaImage: async ({ mediaType, mediaId }) =>
    await axiosClient.get(tmdbEndpoints.mediaImage({ mediaType, mediaId })),
  mediaSerach: async ({ mediaType, query, page }) =>
    await axiosClient.get(
      tmdbEndpoints.mediaSerach({ mediaType, query, page })
    ),
  personDetail: async ({ personID }) =>
    await axiosClient.get(tmdbEndpoints.personDetail({ personID })),
  personMeida: async ({ personID }) =>
    await axiosClient.get(tmdbEndpoints.personMeida({ personID })),
};
export default tmdbApi;
