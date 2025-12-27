import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  audio: String,
  cover: String,
});

const Song = mongoose.model("Song", songSchema);
export default Song;
