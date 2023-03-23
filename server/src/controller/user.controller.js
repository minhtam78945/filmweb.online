import userModel from "../models/user.model.js";
import jsonwebtoken from "jsonwebtoken";
import responHandle from "../handler/respon.handle.js";

const signup = async (req, res) => {
  try {
    const { username, password, displayName } = req.boy;
    const checkedUser = await userModel.findOne({ username });
    if (checkedUser)
      return responHandle.badrequest(res, "username already username");
    const user = new userModel();
    user.displayName = displayName;
    user.username = username;
    user.setPassword(password);
    await user.save();
    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "24h",
      }
    );
    responHandle.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch (error) {
    responHandle.err(res);
  }
};
const signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel
      .findOne({ username })
      .select("username,password,salt,id,displayName");
    if (!user) {
      return responHandle.badrequest(res, "User not extist");
    }
    if (!user.validPassword(password)) {
      return responHandle.badrequest(res, "Wrong password");
    }
    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "24h",
      }
    );
    user.password = undefined;
    user.salt = undefined;

    responHandle.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch (error) {
    console.log(error);
    responHandle.err(res);
  }
};

const updatePassword = async (res, req) => {
  try {
    const { username, password } = req.body;
    const user = await userModel
      .findById(req.user.id)
      .select("password id salt");
    if (!user) {
      return responHandle.unauther(res);
    }
    if (!user.validPassword(password)) {
      return responHandle.badrequest(res, "Wrong password");
    }
    user.setPassword(password);
    await user.save();
    responHandle.ok(res);
  } catch (error) {
    console.log(error);
    responHandle.err(res);
  }
};

const getInfor = async (res, req) => {
  try {
    const user = await userModel.findById(req.user);
    if (!user) {
      return responHandle.notFund(res);
    }
    responHandle.ok(res, user);
  } catch (error) {
    responHandle.err(res);
  }
};
export default { signin, signup, getInfor, updatePassword };
