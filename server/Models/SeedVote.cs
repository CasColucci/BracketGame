namespace Models;
public class SeedVote
{
  public Guid Id { get; set; }
  public Guid GameId { get; set; }
  public Guid PlayerId { get; set; }
  public Guid VotedForGameItemId { get; set; }
  public int Position { get; set; }
}
