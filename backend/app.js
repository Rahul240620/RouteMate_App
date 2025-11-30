const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const cookiesParser = require("cookie-parser");
const cors = require("cors");

app.use(cors());
const connectToDB = require("./db/db");
connectToDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiesParser());

app.get("/", (req, res) => {
  res.send("hello world");
});

//routes import
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
const mapsRoutes = require("./routes/maps.routes");
const rideRoutes = require("./routes/ride.routes");

//routes declarations
app.use("/users", userRoutes);
app.use("/captains", captainRoutes);
app.use("/maps", mapsRoutes);
app.use("/rides", rideRoutes);

module.exports = { app };
