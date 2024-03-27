const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).json({
      message: "Users feteched succesfully",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    user.password = undefined;

    return res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    updatedUser.password = undefined;

    return res.status(200).json({
      message: "User updated successfully",
      updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};
