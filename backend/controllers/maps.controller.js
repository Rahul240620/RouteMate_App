const {
  getAddressCoordinates,
  getDistanceAndTime,
  getCompleteSuggestions,
} = require("../utils/maps.service");
const { validationResult } = require("express-validator");
const getCoordinates = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { address } = req.query;

  try {
    const coordinates = await getAddressCoordinates(address);
    res.status(200).json({ coordinates });
  } catch (error) {
    res.status(400).json({ message: " address not found " });
  }
};

//get-distance-time
const getDistanceTime = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { origin, destination } = req.query;
    const distanceTime = await getDistanceAndTime(origin, destination);
    res.status(200).json({ distanceTime });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: " address not found " });
  }
};

const getAutoCompleteSuggestions = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { input } = req.query;
    const suggestions = await getCompleteSuggestions(input);
    res.status(200).json({ suggestions });
  } catch (error) {
    res.status(400).json({ message: " address not found " });
  }
};

module.exports = {
  getCoordinates,
  getDistanceTime,
  getAutoCompleteSuggestions,
};
