import responoseHandler from "../handler/respon.handle.js";
import favoriteModel from "../models/favorite.model.js";

// add Favorite
const addFavorite = async (req, res) => {
  try {
    const isFavorite = await favoriteModel.findOne({
      user: req.user.id,
      mediaId: req.body.mediaId,
    });
    if (isFavorite) {
      return responoseHandler.ok(res, isFavorite);
    }
    const favorite = new favoriteModel({ ...req.body, user: req.user.id });
    await favorite.save();
    responoseHandler.created(res, favorite);
  } catch (error) {
    console.log(error);
    responoseHandler.err(res);
  }
};
const removeFavorite = async (req, res) => {
  try {
    const { favoriteId } = req.params;
    const favorite = await favoriteModel.findOne({
      user: req.user.id,
      _id: favoriteId,
    });
    if (!favorite) {
      return responoseHandler.notFund(res);
    }
    await favorite.remove();
    responoseHandler.ok(res);
  } catch (error) {
    responoseHandler.err(res);
  }
};

const getFavoriteUser = async (req, res) => {
  try {
    const favorite = await favoriteModel
      .findOne({ user: req.user.id })
      .sort("-createAt");
    responoseHandler.ok(res, favorite);
  } catch (error) {
    responoseHandler.err(res);
  }
};
export default { addFavorite, removeFavorite, getFavoriteUser };
