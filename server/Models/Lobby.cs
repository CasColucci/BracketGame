namespace BracketGame.Server.Models;

public class Lobby
{
    public Guid Id { get; set; }
    public ICollection<Game> Games { get; set; } = new List<Game>();
    public ICollection<Player> Players { get; set; } = new List<Player>();
    public string Code { get; set; }
    public Guid? CurrentGameId { get; set; }
}
