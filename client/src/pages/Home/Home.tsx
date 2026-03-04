import styles from './Home.module.css';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { useState } from 'react';

export default function Home() {
    const [view, setView] = useState<"menu" | "join" | "create">("menu")

    if (view === "join") {
        return (
            <Card title="Join Lobby">
                {/* code input, name input, join button */}
            </Card>
        )
    }

    if (view === "create") {
        return (
            <Card title="Create Lobby">
                {/* name input, create button */}
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

