const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase:true,
      trim:true,
     
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
const User = mongoose.model("User", userSchema);
module.exports = User;
