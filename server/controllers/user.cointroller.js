import User from "../model/user.model.js";

export const profileUpdate = async (req, res, next) => {
  try {
    const { userID, avatar } = req.body;
    const user = await User.findById(userID);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    user.avatar = avatar;
    await user.save();
    res.status(201).json({ message: "User profile updated successfully" });
  } catch (error) {
    next(error);
  }
};
