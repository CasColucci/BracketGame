export type Player = {
    id: string
    displayName: string
    isHost: boolean
}

export type LobbyData = {
    lobbyCode: string
    displayName: string
    players: Player[]
}
