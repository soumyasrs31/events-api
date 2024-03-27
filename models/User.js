const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: false,
    },
    regd_no:{
      type: String,
    },
    dob:{
      type: String,
    },
    branch:{
      type: String,
    },
    gender:{
      type: String,
    },
    
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user",
    },
    profilePic: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
