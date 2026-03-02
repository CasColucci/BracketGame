using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BracketGame.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddGamePhaseValuesAndSubmittedBy : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ActiveGameId",
                table: "Lobbies",
                newName: "CurrentGameId");

            migrationBuilder.AddColumn<bool>(
                name: "IsHost",
                table: "Players",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string[]>(
                name: "Losers",
                table: "Games",
                type: "text[]",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Winner",
                table: "Games",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "SubmittedByPlayerId",
                table: "GameItems",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsHost",
                table: "Players");

            migrationBuilder.DropColumn(
                name: "Losers",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "Winner",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "SubmittedByPlayerId",
                table: "GameItems");

            migrationBuilder.RenameColumn(
                name: "CurrentGameId",
                table: "Lobbies",
                newName: "ActiveGameId");
        }
    }
}
