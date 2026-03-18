const User = require("../models/User");
const bycrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exist" });
    }
    const hashPassword = await bycrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });
    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User does not exist" });
    const isMatchPassword = await bycrypt.compare(password, user.password);
    if (!isMatchPassword)
      return res.status(400).json({ message: "Invalid Password" });

    const token = JWT.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );
    res.json({ message: "Login Successfully", token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  register,
  login,
};
