import { useState, useEffect } from "react";

const CLOUD_NAME = "dei1fzfku";          // 🔴 yaha apna cloud name
const UPLOAD_PRESET = "music_upload";    // 🔴 yaha apna upload preset

export default function Admin() {
  const [form, setForm] = useState({
    title: "",
    artist: "",
    cover: "",
    audio: ""
  });

  const [songs, setSongs] = useState([]);
  const [uploading, setUploading] = useState(false);

  // ================= UPLOAD FILE =================
  const uploadFile = async (file) => {
    if (!file) return "";

    setUploading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
      {
        method: "POST",
        body: data
      }
    );

    const result = await res.json();
    console.log("Cloudinary response:", result);

    setUploading(false);
    return result.secure_url;
  };

  // ================= ADD SONG =================
  const addSong = async () => {
    console.log("FORM DATA:", form);

    if (!form.title || !form.artist || !form.cover || !form.audio) {
      alert("All fields required");
      return;
    }

    await fetch("http://localhost:5000/songs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    setForm({ title: "", artist: "", cover: "", audio: "" });
    fetchSongs();
    alert("Song added successfully ✅");
  };

  // ================= FETCH SONGS =================
  const fetchSongs = async () => {
    const res = await fetch("http://localhost:5000/songs");
    const data = await res.json();
    setSongs(data);
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  // ================= UI =================
  return (
    <div style={{ padding: 20 }}>
      <h2>🎵RPS Admin Panel</h2>

      <input
        placeholder="Song Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <br /><br />

      <input
        placeholder="Artist Name"
        value={form.artist}
        onChange={(e) => setForm({ ...form, artist: e.target.value })}
      />

      <br /><br />

    <label>Cover Image:</label>
<input
  type="file"
  accept="image/*"
  onChange={async (e) => {
    const coverUrl = await uploadFile(e.target.files[0]);
    console.log("COVER URL 👉", coverUrl);

    setForm((prev) => ({
      ...prev,
      cover: coverUrl
    }));
  }}
/>
<br></br>
<label>Audio File:</label>
<input
  type="file"
  accept="audio/*"
  onChange={async (e) => {
    const audioUrl = await uploadFile(e.target.files[0]);
    console.log("AUDIO URL 👉", audioUrl);

    setForm((prev) => ({
      ...prev,
      audio: audioUrl
    }));
  }}
/>


      <br /><br />

      <button onClick={addSong} disabled={uploading}>
        {uploading ? "Uploading..." : "➕ Add Song"}
      </button>

      <hr />

      <h3>🎶 Uploaded Songs</h3>
      {songs.map((s) => (
        <div key={s._id}>
          {s.title} - {s.artist}
        </div>
      ))}
    </div>
  );
}
