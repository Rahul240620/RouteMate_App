const mongoose = require("mongoose");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
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
        minlength: [3, "Lastname must be at least 3 characters long"],
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: [3, "Email must be at least 3 characters long"],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    socketId: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "24h",
  });
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return await bycrypt.compare(password, this.password);
};
userSchema.statics.hashPassword = async function (password) {
  return await bycrypt.hash(password, 10);
};
userModel = mongoose.model("user", userSchema);
module.exports = { userModel }; // export userModel;
