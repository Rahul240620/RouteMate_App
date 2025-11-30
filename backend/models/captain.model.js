const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const captainSchema = new mongoose.Schema(
  {
    fullname: {
      firstname: {
        type: String,
        required: true,
        minlength: [3, "Firstname must be at least 3 characters long"],
      },
      lastname: {
        type: String,
        required: true,
        minlength: [3, "lastname must be at least 3 characters long"],
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    socketId: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    vehicle: {
      color: {
        type: String,
        required: true,
        minlength: [3, "color must be at least 3 characters long"],
      },
      plate: {
        type: String,
        required: true,
        minlength: [3, "plate must be at least 3 characters long"],
      },
      capacity: {
        type: Number,
        required: true,
        minlength: [1, "capacity must be at least 1 characters long"],
      },
      vehicleType: {
        type: String,
        required: true,
        enum: ["car", "motorcycle", "auto"],
      },
    },
    location: {
      ltd: {
        type: Number,
      },
      lng: {
        type: Number,
      },
    },
  },
  { timestamps: true }
);
captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "24h",
  });
  return token;
};
captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

captainModel = mongoose.model("captain", captainSchema);
module.exports = { captainModel };
