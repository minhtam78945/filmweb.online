const mongoose = require("mongoose");
import modelOptions from "./model.opton.js";
import crypto from "crypto";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
      select: false,
    },
    salt: {
      type: String,
      require: true,
      select: false,
    },
  },
  modelOptions
);
userSchema.method.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.password = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64)
    .toString("hex");
};
userSchema.method.validPassword = function (password) {
  const hashed = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64)
    .toString("hex");
  return this.password === hashed;
};
const userModel = mongoose.model("User", userSchema);

export default userModel;
