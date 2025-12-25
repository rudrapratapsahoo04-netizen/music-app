import { motion } from "framer-motion";
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const MusicCard = ({ song }) => {
  const { setCurrentSong, setIsPlaying } = useContext(PlayerContext);

  const playSong = () => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      onClick={playSong}
      style={{
        background: "#222",
        padding: 12,
        borderRadius: 10,
        cursor: "pointer"
      }}
    >
      <img src={song.cover} style={{ width: "100%", borderRadius: 8 }} />
      <h3>{song.title}</h3>
      <p style={{ color: "gray" }}>{song.artist}</p>
    </motion.div>
  );
};

export default MusicCard;
