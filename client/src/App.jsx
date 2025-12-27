import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Player from "./components/Player";
import { PlayerProvider } from "./context/PlayerContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PlayerProvider>
          <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/admin" element={<Admin />} />
                </Routes>
          <Player />
        </PlayerProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
