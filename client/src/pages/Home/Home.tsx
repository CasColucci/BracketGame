import styles from './Home.module.css';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { useState } from 'react';
import type { LobbyData } from '../../types';

const LOBBY_CODE_LENGTH = 4;
const NAME_MAX_LENGTH = 16;

function filterLobbyCode(value: string): string {
    return value.replace(/[^a-zA-Z]/g, '').toUpperCase();
}

// Allow letters, numbers, spaces, hyphens, apostrophes
function filterName(value: string): string {
    return value.replace(/[^a-zA-Z0-9 '\-]/g, '');
}

interface HomeProps {
    onEnterLobby: (data: LobbyData) => void
}

export default function Home({ onEnterLobby }: HomeProps) {
    const [view, setView] = useState<"menu" | "join" | "create">("menu")

    // Join view state
    const [lobbyCode, setLobbyCode] = useState("")
    const [lobbyCodeError, setLobbyCodeError] = useState("")
    const [joinName, setJoinName] = useState("")
    const [joinNameError, setJoinNameError] = useState("")
    const [joinError, setJoinError] = useState("")

    // Create view state
    const [createName, setCreateName] = useState("")
    const [createNameError, setCreateNameError] = useState("")
    const [createError, setCreateError] = useState("")

    async function handleJoinClick() {
        let hasError = false;

        if (lobbyCode.length !== LOBBY_CODE_LENGTH) {
            setLobbyCodeError(`Lobby code must be exactly ${LOBBY_CODE_LENGTH} letters.`);
            hasError = true;
        }

        if (joinName.trim() === "") {
            setJoinNameError("Please enter your name.");
            hasError = true;
        }

        if (hasError) return;

        try {
            setJoinError("");

            const response = await fetch('/api/lobby/join', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: lobbyCode, displayName: joinName }),
            });

            if (response.status === 404) {
                setJoinError("There is no lobby associated with that code!");
                return;
            }

            if (!response.ok) {
                setJoinError("Oops! Something went wrong!");
                return;
            }

            const data = await response.json();
            onEnterLobby({ lobbyCode: data.lobbyCode, displayName: joinName, players: data.players ?? [] });
        } catch (err) {
            console.log(err);
            setJoinError("Oops! Something went wrong!");
        }
    }

    async function handleCreateClick() {
        if (createName.trim() === "") {
            setCreateNameError("Please enter your name.");
            return;
        }

        try {
            setCreateError("");

            const response = await fetch('/api/lobby', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ displayName: createName }),
            });

            if (!response.ok) {
                setCreateError("Oops! Something went wrong!");
                return;
            }

            const data = await response.json();
            onEnterLobby({ lobbyCode: data.lobbyCode, displayName: createName, players: data.players ?? [] });
        } catch (err) {
            console.log(err);
            setCreateError("Oops! Something went wrong!");
        }
    }

    if (view === "join") {
        return (
            <Card title="Join Lobby">
                {joinError && <p>{joinError}</p>}
                <Input
                    placeholder='Lobby Code...'
                    value={lobbyCode}
                    maxLength={LOBBY_CODE_LENGTH}
                    error={lobbyCodeError}
                    onChange={(value) => {
                        setLobbyCode(filterLobbyCode(value));
                        if (lobbyCodeError) setLobbyCodeError("");
                    }}
                />
                <Input
                    placeholder='Your Name...'
                    value={joinName}
                    maxLength={NAME_MAX_LENGTH}
                    error={joinNameError}
                    onChange={(value) => {
                        setJoinName(filterName(value));
                        if (joinNameError) setJoinNameError("");
                    }}
                />
                <Button variant='pink' label='Join Lobby' disabled={joinName === "" || lobbyCode === ""} onClick={() => handleJoinClick()} />
                <Button label='Back' onClick={() => { setView("menu"); setJoinError(""); }} />
            </Card>
        )
    }

    if (view === "create") {
        return (
            <Card title="Create Lobby">
                {createError && <p>{createError}</p>}
                <Input
                    placeholder='Your Name...'
                    value={createName}
                    maxLength={NAME_MAX_LENGTH}
                    error={createNameError}
                    onChange={(value) => {
                        setCreateName(filterName(value));
                        if (createNameError) setCreateNameError("");
                    }}
                />
                <Button variant='pink' label='Create Lobby' disabled={createName === ""} onClick={() => handleCreateClick()} />
                <Button label='Back' onClick={() => { setView("menu"); setCreateError(""); }} />
            </Card>
        )
    }

    return (
        <Card title="Golly's Bracket Game">
            <Button variant="pink" label="Create Lobby" onClick={() => setView("create")} />
            <Button variant="white" label="Join Lobby" onClick={() => setView("join")} />
        </Card>
    )
}
