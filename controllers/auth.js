const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    // find user with the given email, if user exists ==> send error
    const user = await User.findOne({ email });

    if (user) {
      return res.status(403).json({
        success: false,
        message: "User already exists",
      });
    }

    // user does't exists ==> hash password and create new user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    newUser.password = undefined;

    // generate jwt token
    const token = jwt.sign(
      {
        _id: newUser._id,
        role: newUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      user: newUser,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
      message: "Server error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists, if not ==> send error
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // user exists ==> match password with the encrypted password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    user.password = undefined;

    // generate jwt token
    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).send({
      success: true,
      message: "User loggedin successfully",
      token,
      user,
    });
  } catch (error) {
    console.log("Error in the login controller: ", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

exports.getLoggedInUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    console.log("user: ", user);

    return res.status(200).send({
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    console.log("Error in getting loggedin user: ", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
