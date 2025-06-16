const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  msg: {
    type: String,
    required: true,
  },
  view: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    enum: ["success", "warning"],
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
  },
});

module.exports = mongoose.model("notification", Schema);
