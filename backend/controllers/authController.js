const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bycrpt = require("bcryptjs");

const userregister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userexist = await User.findOne({ email });
    if (userexist) {
      return res.status(400).json({ message: "User already exist" });
    }
    const salt = await bycrpt.genSalt(10);
    const hashedpassword = await bycrpt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashedpassword,
    });
    return res.status(201).json({ message: "user registered", user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "server error" });
  }
};
const userlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userexist = await User.findOne({ email });
    if (!userexist) {
      return res.status(400).json({ message: "user not exist" });
    }
    const user = await bycrpt.compare(password, userexist.password);
    if (!user) {
      return res.status(400).json({ message: "Invalid cridential" });
    }
    const token = jwt.sign(
      {
        id: user._id,

        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      },
    );
    return res.status(200).json({ message: "login successfull", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  userregister,
  userlogin,
};
