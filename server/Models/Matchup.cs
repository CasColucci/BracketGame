namespace Models;
public class Matchup
{
  public Guid Id { get; set; }
  public Guid RoundId { get; set; }
  public MatchPhase Phase { get; set; }
  public Guid? NextMatchupId { get; set; }
  public ICollection<Vote> Votes { get; set; }
  public Guid GameItemIdA { get; set; }
  public Guid GameItemIdB { get; set; }
  public Guid? WinnerId { get; set; }
}
