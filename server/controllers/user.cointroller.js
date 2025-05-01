import User from "../model/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const updateUserCredential = async (req, res, next) => {
  const userID = req.params.id;
  if (req.user.id != userID)
    return next(errorHandler(401, "You can only update your own account!"));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.passworda, 10);
    }
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          userName: req.body.userName,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...userDetails } = updateUser._doc;
    res.status(200).json(userDetails);
  } catch (error) {
    next(error);
  }
};
