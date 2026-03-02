using BracketGame.Server.Models;

namespace BracketGame.Server.Services;

public class PlayerService
{
    public Player CreatePlayer(string displayName)
    {
        return new Player()
        {
            DisplayName = displayName
        };
    }
}
