using Microsoft.AspNetCore.SignalR;

namespace Hubs;
public class BracketHub : Hub
{
  public async Task JoinLobby(string lobbyCode, string displayName)
  {
    await Groups.AddToGroupAsync(Context.ConnectionId, lobbyCode);
    await Clients.OthersInGroup(lobbyCode).SendAsync("PlayerJoined", displayName);
  }
}
