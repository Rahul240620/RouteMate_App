const express = require("express");
const router = express.Router();
const { authUser, authCaptain } = require("../middleware/auth.middleware");
const {
  getRides,
  fareDetails,
  confirmRide,
  startRide,
  endRide,
} = require("../controllers/ride.controller");
const { body, query } = require("express-validator");

// create ride
router.post(
  "/create",
  authUser,
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup Adress"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination Adress"),
  body("vehicleType")
    .isString()
    .isIn(["car", "bike", "motorcycle"])
    .withMessage("Invalid vehicleType"),
  getRides
);

// get-fare
router.get(
  "/get-fare",
  authUser,
  query("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup Adress"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination Adress"),

  fareDetails
);

// confirm ride
router.post(
  "/confirm",
  authCaptain,
  body("rideId").isMongoId().withMessage("Invalid ride id"),
  confirmRide
);

// start ride
router.get(
  "/start-ride",
  authCaptain,
  query("rideId").isMongoId().withMessage("Invalid ride id"),
  query("otp")
    .isString()
    .isLength({ min: 6, max: 6 })
    .withMessage("Invalid OTP"),
  startRide
);

// end ride
router.post(
  "/end-ride",
  authCaptain,
  body("rideId").isMongoId().withMessage("Invalid ride id"),
  endRide
);

module.exports = router;
