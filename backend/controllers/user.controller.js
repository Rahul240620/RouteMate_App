const e = require("cors");
const { userModel } = require("../models/user.model");
const { createUser } = require("../utils/user.service");
const { validationResult } = require("express-validator");
const blacklistToken = require("../models/blacklistToken.model");

const registerUser = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).send(error.array());
  }

  const { fullname, email, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({ email });
  if (isUserAlreadyExist) {
    return res.status(400).send("User already exist");
  }

  const hashedPassword = await userModel.hashPassword(password);
  const user = await createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();
  res.status(201).send({ token, user });
};

const loginUser = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).send(error.array());
  }
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    res.status(401).json({ message: "user not found" });
  }
  const ismatch = await user.comparePassword(password);
  if (!ismatch) {
    res.status(401).json({ message: "invalid password" });
  }
  const token = user.generateAuthToken();
  res.cookie("token", token);
  res.status(201).json({ token, user });
};

const getUserProfile = async (req, res) => {
  res.status(200).send(req.user);
};

const logoutUser = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await blacklistToken.create({ blackListToken: token });
  res.clearCookie("token");
  res.status(200).json({ message: "logged out successfully" });
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
};
