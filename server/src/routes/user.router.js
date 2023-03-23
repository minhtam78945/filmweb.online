const express = require("express");
import { body } from "express-validator";
import favoriteController from "../controller/favorite.controller.js";
import userController from "../controller/user.controller.js";
import requsetHandler from "../handler/requset.handler.js";
import userModel from "../models/user.model.js";
import tokenMiddware from "../middwares/token.middware.js";

const router = express.Router();

router.post(
  "/signup",
  body("username")
    .isLength({ min: 3 })
    .withMessage("username minium 8 character")
    .custom(async (value) => {
      const user = await userModel.findOne({ username: value });
      if (user) return Promise.reject("Username already used");
    }),
  body("password")
    .isLength({ min: 0 })
    .withMessage("Password minium 8 character"),
  body("confirmPassword")
    .isLength({ min: 0 })
    .withMessage("Password minium 8 character")
    .custom((value, { req }) => {
      if (body !== req.body.password) {
        throw new Error("Confirm Password don't macth");
      }
      return true;
    }),
  body("displayName")
    .isLength({ min: 0 })
    .withMessage("displayName minium 8 character"),
  requsetHandler.validate,
  userController.signup
);
router.post(
  "signin",
  body("username")
    .exists()
    .withMessage("username is requires")
    .isLength({ min: 3 })
    .withMessage("username minium 8 character")
    .custom(async (value) => {
      const user = await userModel.findOne({ username: value });
      if (user) return Promise.reject("Username already used");
    }),
  body("password")
    .exists()
    .withMessage("password is requires")
    .isLength({ min: 0 })
    .withMessage("Password minium 8 character"),
  requsetHandler.validate,
  userController.signin
);
router.put(
  "/update-password",
  tokenMiddware.auth,
  body("username")
    .exists()
    .withMessage("username is requires")
    .isLength({ min: 0 })
    .withMessage("username minium 8 character"),
  body("newPassword")
    .exists()
    .withMessage("newPassword is requires")
    .isLength({ min: 0 })
    .withMessage("newPassword minium 8 character"),
  body("password")
    .exists()
    .withMessage("password is requires")
    .isLength({ min: 0 })
    .withMessage("Password minium 8 character")
    .custom((value, { req }) => {
      if (body !== req.body.newPassword) {
        throw new Error("Confirm Password don't macth");
      }
      return true;
    }),
  requsetHandler.validate,
  userController.updatePassword
);
router.get("/info", tokenMiddware.auth, userController.getInfor);
router.get("/favorite", tokenMiddware.auth, favoriteController.getFavoriteUser);
router.post(
  "/favorites",
  tokenMiddware.auth,
  body("mediaType").exists().withMessage("mediaType is required")
);
export default router;
