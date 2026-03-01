namespace BracketGame.Server.DTOs;

public class PlayerDto
{
    public Guid Id { get; set; }
    public string DisplayName { get; set; }
    public bool IsHost { get; set; }
}
