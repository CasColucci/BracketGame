import styles from './Lobby.module.css';

interface LobbyProps {
    lobbyCode: string
    displayName: string
}

export default function Lobby({ lobbyCode, displayName }: LobbyProps) {
    return (
        <div className={styles.lobby}>
            {/* TODO */}
        </div>
    )
}
