const { captainModel } = require("../models/captain.model");
const { createCaptain } = require("../utils/captain.service");
const { validationResult } = require("express-validator");
const blacklistToken = require("../models/blacklistToken.model");
const registerCaptain = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).send(error.array());
  }
  const { fullname, email, password, vehicle } = req.body;
  console.log(fullname, email, password, vehicle);
  const isCaptainAlreadyExist = await captainModel.findOne({ email });
  if (isCaptainAlreadyExist) {
    return res.status(400).send("Captain already exist");
  }

  const hashedPassword = await captainModel.hashPassword(password);
  const captain = await createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  const token = captain.generateAuthToken();
  res.cookie("token", token);
  res.status(201).send({ token, user: captain });
};

const loginCaptain = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).send(error.array());
  }
  const { email, password } = req.body;
  const captain = await captainModel.findOne({ email }).select("+password");
  if (!captain) {
    res.status(401).json({ message: "user not found" });
  }
  const ismatch = await captain.comparePassword(password);
  if (!ismatch) {
    res.status(401).json({ message: "invalid password" });
  }
  const token = captain.generateAuthToken();
  res.cookie("token", token);
  res.status(201).json({ token, captain });
};

const getCaptainProfile = async (req, res) => {
  res.status(200).json({ captain: req.captain });
};

const logoutCaptain = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await blacklistToken.create({ blackListToken: token });
  res.clearCookie("token");
  res.status(200).json({ message: "logged out successfully" });
};

module.exports = {
  registerCaptain,
  loginCaptain,
  getCaptainProfile,
  logoutCaptain,
};
