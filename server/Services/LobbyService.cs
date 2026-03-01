using Models;

namespace BracketGame.Server.Services;

public class LobbyService(BracketDbContext dbContext)
{
    public Lobby CreateLobby(string displayName)
    {

    }

    public Lobby? ValidateCode(string code)
    {
        return dbContext.Lobbies
            .FirstOrDefault(x => x.Code == code);
    }

    public Lobby JoinLobby(string code, string displayName)
    {

    }
}


