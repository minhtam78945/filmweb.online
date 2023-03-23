import responHandle from "../handler/respon.handle.js";
import tmdbApi from "../tmdb/tmdb.api.js";
import userModel from "../models/user.model.js";
import favoriteModel from "../models/favorite.model.js";
import reviewModel from "../models/reviwer.model.js";
import tokenMiddlware from "../middwares/token.middware.js";
const getList = async (req, res) => {
  try {
    const { page } = req.body;
    const { mediaType, mediaCategory } = req.params;

    const response = await tmdbApi.mediaList({
      mediaType,
      mediaCategory,
      page,
    });
    return responHandle.ok(res, response);
  } catch (error) {
    console.log(error);
    responHandle.err(res);
  }
};

const getGeneres = async (req, res) => {
  try {
    const { mediaType } = req.params;
    const response = await tmdbApi.mediaGenrer({ mediaType });
    return responHandle.ok(res, response);
  } catch (error) {
    console.log(error);
    responHandle.err(res);
  }
};
const search = async (req, res) => {
  try {
    const { mediaType } = req.params;
    const { query, page } = req.query;

    const response = await tmdbApi.mediaSerach({
      query,
      page,
      mediaType: mediaType === "people" ? "person" : mediaType,
    });
    responHandle.ok(res, response);
  } catch (error) {
    console.log(error);
    responHandle.err(res);
  }
};

const getDetail = async (req, res) => {
  try {
    const { mediaType, mediaId } = req.params;
    const params = { mediaType, mediaId };
    const media = await tmdbApi.mediaDetails(params);
    media.credtis = await tmdbApi.mediaCredits(params);
    const video = await tmdbApi.mediaVideos(params);
    media.video = video;
    const recommend = await tmdbApi.mediaRecommend(params);
    media.recommend = recommend.results;
    media.images = await tmdbApi.mediaImage(params);

    const tokenDecoded = tokenMiddlware.tokenCode(req);
    if (tokenDecoded) {
      const user = await userModel.findById(tokenDecoded.data);
      if (user) {
        const isFavorite = await favoriteModel.findOne({
          user: user.id,
          mediaId,
        });
        media.isFavorite = isFavorite !== null;
      }
    }
    media.reviews = await reviewModel
      .findOne({ mediaId })
      .populate("user")
      .sort("-createAt");
    responHandle.ok(res, media);
  } catch (error) {
    console.log(error);
    responHandle.err(res);
  }
};
export default { getList, getDetail, getGeneres, search };
