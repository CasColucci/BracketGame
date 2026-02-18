using Enums;
namespace Models;
public class Game
{
  public Guid Id { get; set; }
  public string CategoryName { get; set; }
  public GamePhase Phase { get; set; }
  public ICollection<GameItem> GameItems { get; set; }
  public ICollection<Round> Rounds { get; set; }
  public Guid? CurrentRoundId { get; set; }
  public Guid LobbyId { get; set; }
}
