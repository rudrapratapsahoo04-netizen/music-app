import express from "express";
import Song from "../models/Song.js";

const router = express.Router();

// ✅ GET all songs
router.get("/", async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ ADD song
router.post("/", async (req, res) => {
  try {
    const song = new Song(req.body);
    await song.save();
    res.status(201).json(song);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/test", (req, res) => {
  res.json({ message: "Songs route working ✅" });
});

// ✅ DELETE song
router.delete("/:id", async (req, res) => {
  try {
    await Song.findByIdAndDelete(req.params.id);
    res.json({ message: "Song deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;


