using System.Text;
using BracketGame.Server.DTOs;
using BracketGame.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace BracketGame.Server.Services;

public class LobbyService(BracketDbContext dbContext, PlayerService playerService)
{
    public async Task<JoinLobbyResponseDto> CreateLobby(string displayName)
    {
        string lobbyCode = await GenerateLobbyCode();
        Lobby lobby = new Lobby()
        {
            Code = lobbyCode
        };
        var player = playerService.CreatePlayer(displayName);

        lobby.Players.Add(player);

        dbContext.Lobbies.Add(lobby);
        await dbContext.SaveChangesAsync();

        var players = new List<PlayerDto>();
        players.Add(new PlayerDto
        {
            Id = player.Id,
            DisplayName = player.DisplayName,
            IsHost = player.IsHost
        });

        return new JoinLobbyResponseDto
        {
            PlayerId = player.Id,
            PlayerDisplayName = player.DisplayName,
            LobbyId = lobby.Id,
            LobbyCode = lobby.Code,
            Players = players,
            CurrentGameId = null,
            PriorGames = null
        };
    }

    public async Task<Lobby?> ValidateCode(string code)
    {
        return await dbContext.Lobbies
            .FirstOrDefaultAsync(x => x.Code == code);
    }

    public async Task<JoinLobbyResponseDto> JoinLobby(string code, string displayName)
    {
        var lobby = await dbContext.Lobbies
            .Include(l => l.Players)
            .Include(l => l.Games)
            .FirstOrDefaultAsync(x => x.Code == code);
        if (lobby == null)
        {
            throw new KeyNotFoundException("Lobby not found!");
        }
        var player = playerService.CreatePlayer(displayName);

        lobby.Players.Add(player);
        await dbContext.SaveChangesAsync();

        var players = new List<PlayerDto>();
        foreach (Player item in lobby.Players)
        {
            players.Add(new PlayerDto
            {
                Id = item.Id,
                DisplayName = item.DisplayName,
                IsHost = item.IsHost
            });
        }

        var games = new List<PriorGameDto>();
        foreach (Game item in lobby.Games)
        {
            if (item.Id != lobby.CurrentGameId && item.Winner != null && item.Losers != null)
            {
                games.Add(new PriorGameDto
                {
                    Id = item.Id,
                    Category = item.CategoryName,
                    Winner = item.Winner,
                    Losers = item.Losers.ToList()
                });
            }
        }

        return new JoinLobbyResponseDto
        {
            PlayerId = player.Id,
            PlayerDisplayName = player.DisplayName,
            LobbyId = lobby.Id,
            LobbyCode = lobby.Code,
            Players = players,
            CurrentGameId = lobby.CurrentGameId,
            PriorGames = games
        };
    }

    private async Task<string> GenerateLobbyCode()
    {
        var alphabet = "BCDFGHJKLMNPQRSTVWXYZ";
        var random = new Random();

        var result = new StringBuilder();
        while (true)
        {
            result.Clear();
            for (int i = 0; i < 4; i++)
            {
                result.Append(alphabet[random.Next(alphabet.Length)]);
            }
            if (await ValidateCode(result.ToString()) == null)
            {
                break;
            }
        }

        return result.ToString();
    }
}


