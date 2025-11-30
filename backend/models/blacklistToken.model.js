const mongoose = require("mongoose");

const blacklistTokenSchema = new mongoose.Schema({
  blackListToken: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 86400,
  },
});

module.exports = mongoose.model("blacklistToken", blacklistTokenSchema);
