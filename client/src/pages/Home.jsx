<a
  href="#/admin"
  style={{
    color: "white",
    background: "#ff4757",
    padding: "8px 12px",
    borderRadius: "6px",
    textDecoration: "none"
  }}
>
  ➕ Open Admin Panel
</a>

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [songs, setSongs] = useState([]);
  const [current, setCurrent] = useState(null);
  const audioRef = useRef(null);
  const [userStarted, setUserStarted] = useState(false);

  // ✅ Fetch songs from LIVE backend
 useEffect(() => {
  fetch("https://music-app-6tu4.onrender.com/api/songs")
    .then(res => res.json())
    .then(data => setSongs(data));
}, []);

  // ▶️ Play when song changes
  useEffect(() => {
    if (audioRef.current && current && userStarted) {
      audioRef.current.load();
      audioRef.current.play().catch(() => {});
    }
  }, [current, userStarted]);

  const startSong = (song) => {
    setUserStarted(true);
    setCurrent(song);
  };

  const playNext = () => {
    if (!current || songs.length === 0) return;
    const index = songs.findIndex(s => s._id === current._id);
    setCurrent(songs[(index + 1) % songs.length]);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🎧 Music App</h2>

      {/* SONG LIST */}
      {songs.map(song => (
        <div
          key={song._id}
          style={{ display: "flex", cursor: "pointer", marginBottom: 10 }}
          onClick={() => startSong(song)}
        >
          <img src={song.cover} width="60" />
          <div style={{ marginLeft: 10 }}>
            <div>{song.title}</div>
            <small>{song.artist}</small>
          </div>
        </div>
      ))}

      {/* PLAYER */}
      {current && (
        <div style={{ marginTop: 30 }}>
          <h3>Now Playing 🎶</h3>
          <img src={current.cover} width="150" />
          <p>{current.title}</p>

          <audio
            ref={audioRef}
            controls
            src={current.audio}
            onEnded={playNext}
          />
        </div>
      )}
    </div>
  );
}

