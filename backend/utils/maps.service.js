const axios = require("axios");

//get-coordinates
const getAddressCoordinates = async (address) => {
  const apiKey = process.env.GOOGLE_MAP_API;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return {
        ltd: location.lat,
        lng: location.lng,
      };
    } else {
      // Log why Google rejected it
      console.error("Geocoding API error:", response.data);
      throw new Error(`Unable to find address: ${response.data.status}`);
    }
  } catch (error) {
    console.error("Axios error:", error.message);
    throw error;
  }
};

//get-distance-time
const getDistanceAndTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("All fields are required");
  }

  const apiKey = process.env.GOOGLE_MAP_API;

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      if (response.data.rows[0].elements[0].status === "ZERO_RESULTS") {
        throw new Error("Unable to find address");
      }
      return response.data.rows[0].elements[0];
    } else {
      throw new Error("Unable to fetch distance and time");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//get-complete-suggestions
const getCompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error("All fields are required");
  }

  const apiKey = process.env.GOOGLE_MAP_API;

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      return response.data.predictions;
    } else {
      throw new Error("Unable to fetch suggestions");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// get-captains in radius
const getCaptainsInTheRadius = async (ltd, lng, radius) => {
  // radius in km

  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd, lng], radius / 6371],
      },
    },
  });

  return captains;
};

module.exports = {
  getAddressCoordinates,
  getDistanceAndTime,
  getCompleteSuggestions,
  getCaptainsInTheRadius,
};
