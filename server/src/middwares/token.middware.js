import jsonwebtoken from "jsonwebtoken";
import responHandle from "../handler/respon.handle.js";
import userModel from "../models/user.model.js";

const tokenCode = (req) => {
  try {
    const beararHeader = req.headers["authorization"];
    if (beararHeader) {
      const token = beararHeader.split("Bearers ")[1];
      return jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
    }
    return false;
  } catch (error) {
    console.log(error);
  }
};
const auth = async (req, res, next) => {
  const tokenDecode = tokenCode(req);
  if (!tokenDecode) {
    return responHandle.unauther(res);
  }
  const user = await userModel.findById(tokenDecode.data);
  if (!user) {
    return responHandle.unauther(res);
  }
  rep.user = user;
  next();
};

export default { auth, tokenCode };
