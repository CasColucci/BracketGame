namespace Models;
public class GameItem
{
  public Guid Id { get; set; }
  public Guid GameId { get; set; }
  public string ItemName { get; set; }
  public int SeedRank { get; set; }
  public int SeedScore { get; set; }
  public Guid? MatchupId { get; set; }
}
