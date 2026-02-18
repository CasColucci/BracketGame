namespace Models;
public class Vote
{
  public Guid Id { get; set; }
  public Guid MatchupId { get; set; }
  public Guid PlayerId { get; set; }
  public Guid VotedForGameItemId { get; set; }
}
