using Microsoft.EntityFrameworkCore;
using Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<BracketDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddSignalR();

var app = builder.Build();

app.UseHttpsRedirection();

app.MapHub<BracketHub>("/hub/bracket");

app.Run();
