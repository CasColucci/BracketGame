namespace Models;
public class Round
{
  public Guid Id { get; set; }
  public Guid GameId { get; set; }
  public int RoundNumber { get; set; }
  public ICollection<Matchup> Matchups { get; set; }
}
