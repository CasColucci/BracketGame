using Microsoft.EntityFrameworkCore;
using Models;
public class BracketDbContext : DbContext
{
  public BracketDbContext(
      DbContextOptions<BracketDbContext> options 
      ) : base(options) { }

  public DbSet<Lobby> Lobbies { get; set; }
  public DbSet<Player> Players { get; set; }
  public DbSet<Game> Games { get; set; }
  public DbSet<GameItem> GameItems { get; set; }
  public DbSet<Round> Rounds { get; set; }
  public DbSet<Matchup> Matchups { get; set; }
  public DbSet<Vote> Votes { get; set; }
  public DbSet<SeedVote> SeedVotes { get; set; }
}
