namespace BracketGame.Server.DTOs;

public class GameItemDto
{
    public Guid Id { get; set; }
    public string ItemName { get; set; }
    public string SubmittedByPlayerDisplayName { get; set; }
    public int? SeedRank { get; set; }
}
