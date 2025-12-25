import { useContext, useRef, useEffect } from "react";
import { PlayerContext } from "../context/PlayerContext";

const Player = () => {
  const { currentSong, isPlaying, setIsPlaying } = useContext(PlayerContext);
  const audioRef = useRef();

  useEffect(() => {
    if (currentSong && isPlaying) {
      audioRef.current.play();
    }
  }, [currentSong]);

  if (!currentSong) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#111",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        padding: "10px 20px",
        gap: 15
      }}
    >
      <img src={currentSong.cover} width="50" />
      <div>
        <h4>{currentSong.title}</h4>
        <p style={{ fontSize: 12 }}>{currentSong.artist}</p>
      </div>

      <button
        onClick={() => {
          if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
          } else {
            audioRef.current.play();
            setIsPlaying(true);
          }
        }}
      >
        {isPlaying ? "⏸ Pause" : "▶ Play"}
      </button>

      <audio ref={audioRef} src={currentSong.audio} />
    </div>
  );
};

export default Player;
