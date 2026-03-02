using Microsoft.EntityFrameworkCore;
using Hubs;
using BracketGame.Server.Services;
using BracketGame.Server.Records;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<BracketDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddSignalR();

builder.Services.AddScoped<LobbyService>();
builder.Services.AddScoped<PlayerService>();

var app = builder.Build();

app.UseHttpsRedirection();

app.MapHub<BracketHub>("/hub/bracket");

app.MapPost("/api/lobby", async (CreateLobbyRequest request, LobbyService lobbyService) =>
{
    var result = await lobbyService.CreateLobby(request.DisplayName);
    return Results.Ok(result);
});

app.MapPost("/api/lobby/join", async (JoinLobbyRequest request, LobbyService lobbyService) =>
{
    var result = await lobbyService.JoinLobby(request.Code, request.DisplayName);
    return Results.Ok(result);
});

app.MapGet("/api/lobby/validate", async (string code, LobbyService lobbyService) =>
{
    var result = await lobbyService.ValidateCode(code);
    return Results.Ok(result != null);
});

app.Run();
