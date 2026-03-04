import styles from './Home.module.css';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { useState } from 'react';

export default function Home() {
    const [view, setView] = useState<"menu" | "join" | "create">("menu")
    const [displayName, setDisplayName] = useState("")
    const [lobbyCode, setLobbyCode] = useState("")

    if (view === "join") {
        return (
            <Card title="Join Lobby">
                <Input placeholder='Lobby Code...' onChange={(value) => setLobbyCode(value)} />
                <Input placeholder='Your Name...' onChange={(value) => setDisplayName(value)} />
                <Button variant='pink' label='Join Lobby' disabled={displayName === "" || lobbyCode === ""} onClick={() => { }} />
                <Button label='Back' onClick={() => setView("menu")} />
            </Card>
        )
    }

    if (view === "create") {
        return (
            <Card title="Create Lobby">
                <Input placeholder='Your Name...' />
                <Button variant='pink' label='Create Lobby' disabled={displayName === ""} onClick={() => { }} />
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

