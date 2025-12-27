import express from "express";
import Song from "../models/Song.js";

const router = express.Router();

/**
 * GET all songs
 * URL: /api/songs
 */
router.get("/", async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * ADD new song
 * URL: /api/songs
 */
router.post("/", async (req, res) => {
  try {
    const song = new Song(req.body);
    await song.save();
    res.status(201).json(song);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE song by ID
 * URL: /api/songs/:id
 */
router.delete("/:id", async (req, res) => {
  try {
    await Song.findByIdAndDelete(req.params.id);
    res.json({ message: "Song deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;





