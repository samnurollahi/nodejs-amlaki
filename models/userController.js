const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
  },
  os: {
    type: String,
    required: true,
  },
  pageView: {
    type: String,
  },
  pagePrevious: {
    type: String,
  },
  isLogin: {
    type: Boolean,
    required: true,
  },
  role: {},
  idUser: {},
  createAt: {
    type: Date,
  },
});

module.exports = mongoose.model("userController", Schema);
