import styles from './Home.module.css';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { useState } from 'react';

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
    onEnterLobby: (data: { lobbyCode: string, displayName: string }) => void
}

export default function Home({ onEnterLobby }: HomeProps) {
    const [view, setView] = useState<"menu" | "join" | "create">("menu")

    // Join view state
    const [lobbyCode, setLobbyCode] = useState("")
    const [lobbyCodeError, setLobbyCodeError] = useState("")
    const [joinName, setJoinName] = useState("")
    const [joinNameError, setJoinNameError] = useState("")
    const [error, setError] = useState("")

    // Create view state
    const [createName, setCreateName] = useState("")
    const [createNameError, setCreateNameError] = useState("")

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
            setError("");

            const response = await fetch('/api/lobby/join', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ displayName: joinName, lobbyCode }),
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.message ?? "Failed to join lobby.");
                return;
            }

            const data = await response.json();
            onEnterLobby({ lobbyCode: data.lobbyCode, displayName: joinName });
        } catch (err) {
            console.log(err);
            setError("Oops! Something went wrong!");
        }
    }

    async function handleCreateClick() {
        if (createName.trim() === "") {
            setCreateNameError("Please enter your name.");
            return;
        }

        try {
            setError("");

            const response = await fetch('/api/lobby', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ displayName: createName }),
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.message ?? "Failed to create lobby.");
                return;
            }

            const data = await response.json();
            onEnterLobby({ lobbyCode: data.lobbyCode, displayName: createName });
        } catch (err) {
            console.log(err);
            setError("Oops! Something went wrong!");
        }
    }

    if (view === "join") {
        return (
            <Card title="Join Lobby">
                <p>{error}</p>
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
                <Button label='Back' onClick={() => setView("menu")} />
            </Card>
        )
    }

    if (view === "create") {
        return (
            <Card title="Create Lobby">
                <p>{error}</p>
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
                <Button label='Back' onClick={() => setView("menu")} />
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
