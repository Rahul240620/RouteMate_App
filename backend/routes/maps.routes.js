const express = require("express");
const router = express.Router();
const { authUser } = require("../middleware/auth.middleware");
const {
  getCoordinates,
  getDistanceTime,
  getAutoCompleteSuggestions,
} = require("../controllers/maps.controller");
const { query } = require("express-validator");

// get-coordinates route
router.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 3 }),
  authUser,
  getCoordinates
);

// get-distance-time route
router.get(
  "/get-distance-time",
  query("origin").isString().isLength({ min: 3 }),
  query("destination").isString().isLength({ min: 3 }),
  authUser,
  getDistanceTime
);

// suggestion route

router.get(
  "/get-suggestions",
  query("input").isString().isLength({ min: 3 }),
  authUser,
  getAutoCompleteSuggestions
);

module.exports = router;
