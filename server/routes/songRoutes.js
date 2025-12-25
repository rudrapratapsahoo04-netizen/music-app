const express = require("express");
const router = express.Router();
const Song = require("../models/Song");

// GET SONGS
router.get("/", async (req, res) => {
  const songs = await Song.find();
  res.json(songs);
});

// ADD SONG
router.post("/", async (req, res) => {
  console.log("POST DATA RECEIVED 👉", req.body);

  try {
    const song = new Song(req.body);
    await song.save();

    res.status(201).json(song);
  } catch (error) {
    console.log("SAVE ERROR ❌", error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE song (ADMIN)
router.delete("/:id", async (req, res) => {
  await Song.findByIdAndDelete(req.params.id);
  res.json({ message: "Song deleted" });
});

module.exports = router;


  




