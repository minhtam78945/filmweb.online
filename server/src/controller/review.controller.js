import responHandler from "../handler/respon.handle.js";
import reviewModel from "../models/reviwer.model.js";

const create = async (req, res) => {
  try {
    const { moveId } = req.params;
    const review = new reviewModel({
      user: req.user.id,
      moveId,
      ...req.body,
    });
    await review.save();
    responHandler.created(res, {
      ...review._doc,
      id: review.id,
      user: req.user,
    });
  } catch (error) {
    responHandler.err(res);
  }
};
const removeReview = async (req, res) => {
  try {
    const { reviewID } = req.params;
    const review = await reviewModel.findOne({
      _id: reviewID,
      user: req.user.id,
    });
    if (!review) return responHandler.notFund(res);
    await review.remove();
    responHandler.ok(res);
  } catch (error) {
    responHandler.err(res);
  }
};

const getReviewModel = async (req, res) => {
  try {
    const reviews = await reviewModel
      .find({ user: req.user.id })
      .sort("-createAt");
    responHandler.ok(res, reviews);
  } catch (error) {
    console.log(error);
    responHandler.err(res);
  }
};
export default { create, removeReview, getReviewModel };
