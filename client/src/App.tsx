import { useState } from 'react';
import './variables.css';
import Home from './pages/Home/Home';
import Lobby from './pages/Lobby/Lobby';
import type { LobbyData } from './types';

function App() {
    const [view, setView] = useState<"home" | "lobby">("home")
    const [lobbyData, setLobbyData] = useState<LobbyData | null>(null)

    function handleEnterLobby(data: LobbyData) {
        setLobbyData(data);
        setView("lobby");
    }

    if (view === "lobby" && lobbyData) {
        return <Lobby lobbyCode={lobbyData.lobbyCode} displayName={lobbyData.displayName} players={lobbyData.players} />
    }

    return <Home onEnterLobby={handleEnterLobby} />
}

export default App
