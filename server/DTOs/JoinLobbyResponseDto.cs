namespace BracketGame.Server.DTOs;

public class JoinLobbyResponseDto
{
    public Guid PlayerId { get; set; }
    public string PlayerDisplayName { get; set; }
    public Guid LobbyId { get; set; }
    public string LobbyCode { get; set; }
    public List<PlayerDto>? Players { get; set; }
    public Guid? CurrentGameId { get; set; }
    public List<PriorGameDto>? PriorGames { get; set; }
}
