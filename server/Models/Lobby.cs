namespace Models;
public class Lobby 
{
  public Guid Id { get; set; }
  public ICollection<Game> Games { get; set; }
  public ICollection<Player> Players { get; set; }
  public string Code { get; set; }
  public Guid? ActiveGameId { get; set; }
}
