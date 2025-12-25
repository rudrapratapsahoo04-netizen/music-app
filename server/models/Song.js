const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  audio: String,
  cover: String,
});

module.exports = mongoose.model("Song", songSchema);
