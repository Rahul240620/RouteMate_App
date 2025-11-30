const express = require("express");
const router = express.Router();
const { userModel } = require("../models/user.model");
const { body } = require("express-validator");
const {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
} = require("../controllers/user.controller");
const { authUser } = require("../middleware/auth.middleware");
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("Fullname must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min: 6 }).withMessage("Invalid Password"),
  ],
  loginUser
);

router.get("/profile", authUser, getUserProfile);

router.get("/logout", authUser, logoutUser);

module.exports = router;
