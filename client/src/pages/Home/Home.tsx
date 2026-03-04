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

export default function Home() {
    const [view, setView] = useState<"menu" | "join" | "create">("menu")

    // Join view state
    const [lobbyCode, setLobbyCode] = useState("")
    const [lobbyCodeError, setLobbyCodeError] = useState("")
    const [joinName, setJoinName] = useState("")
    const [joinNameError, setJoinNameError] = useState("")

    // Create view state
    const [createName, setCreateName] = useState("")
    const [createNameError, setCreateNameError] = useState("")

    function handleJoinClick() {
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

        // TODO: proceed with join
    }

    function handleCreateClick() {
        if (createName.trim() === "") {
            setCreateNameError("Please enter your name.");
            return;
        }

        // TODO: proceed with create
    }

    if (view === "join") {
        return (
            <Card title="Join Lobby">
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
                <Button variant='pink' label='Join Lobby' disabled={joinName === "" || lobbyCode === ""} onClick={handleJoinClick} />
                <Button label='Back' onClick={() => setView("menu")} />
            </Card>
        )
    }

    if (view === "create") {
        return (
            <Card title="Create Lobby">
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
                <Button variant='pink' label='Create Lobby' disabled={createName === ""} onClick={handleCreateClick} />
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
