import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.opton";

export default mongoose.model(
  "Favorite",
  mongoose.Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      mediaType: {
        type: String,
        enum: ["tv", "movie"],
        require: true,
      },
      mediaId: {
        type: String,
        require: true,
      },
      mediaTitle: {
        type: String,
        require: true,
      },
      mediaPoster: {
        type: String,
        require: true,
      },
      mediaRate: {
        type: String,
        require: true,
      },
    },
    modelOptions
  )
);
