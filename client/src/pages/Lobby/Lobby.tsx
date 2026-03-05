import styles from './Lobby.module.css';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import type { Player } from '../../types';

interface LobbyProps {
    lobbyCode: string
    displayName: string
    players: Player[]
}

export default function Lobby({ lobbyCode, displayName, players }: LobbyProps) {
    return (
        <div className={styles.lobby}>
            <Card title={lobbyCode} variant="wide" titleAlign="left">
                <div className={styles.content}>
                    <div className={styles.playerCard}>
                        <Card title="Players">
                            {players.map((player) => (
                                <div key={player.id} className={styles.playerItem}>
                                    <span>{player.displayName}</span>
                                    {player.isHost && <span className={styles.hostBadge}>HOST</span>}
                                </div>
                            ))}
                        </Card>
                    </div>
                </div>
            </Card>
        </div>
    )
}
