namespace BracketGame.Server.DTOs;

public class PriorGameDto
{
    public Guid Id { get; set; }
    public string Category { get; set; }
    public string Winner { get; set; }
    public List<string> Losers { get; set; }
}
