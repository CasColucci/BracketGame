# BracketGame
A game written in ASP.NET and React with SignalR, to run brackets with your friends! Players join lobbies, suggest items for categories, seed them by voting, and then run through the brackets until the winner emerges!

## Tech Stack
- **Backend**: ASP.NET Minimal API (C#, .NET 8)
- **Frontend**: React and TypesScript
- **Database**: PostgreSQL and Entity Framework Core
- **Real-Time**: SignalR
## Game Flow
1. **Home Screen**: Create or join a lobby
2. **Lobby**: Players gather, see who joined, host can start game
3. **Pending**: Host writes a category name (Such as "Best Musical")
4. **Suggesting**; All players submit candidates for the bracket category
5. **Seeding**: Players rank their top picks. The weighted score determines the bracket pairings
6. **Bracket**; Head to head matchups (highest score vs lowest score, second highest vs second lowest, etc), players vote for their favorite to win each round. Possible addition of timers which can be turned off in the settings.
7.**Complete**: The winner is crowned, the result is saved to the game history, the players are returned to the lobby
## Domain Model
- **Lobby**: Join code, players, prior games, active game
- **Player**: Display name, host flag, lobby they belong to
- **Game**: Category, phase (pending to suggesting to seeding to bracket to complete), items, rounds
- **GameItem**: Candidate name, who submitted it, seed rank
- **Round**: Round number, list of matchups to go through
- **Matchup**: Two items, match phase (pending to preview to voting to results to complete), votes, winner, next matchup reference
- **Vote**: matchup choice, player who cast the vote
- **SeedVote**: GameItem it's associated with, the player who cast hte vote, the position it was placed in
## Project Status
### Completed
#### Backend
- [x] PostgreSQL database setup and EF core config
- [x] All entity models (Lobby, Player, Game, GameItem, Round, Matchup, Vote, SeedVote)
- [x] Enums (GamePhase, MatchPhase)
- [x] Databaes migrations (initialCreate, add game phase values and submitted by)
- [x] PlayerService - Create player entities
- [x] LobbyService - Create Lobby, generate code, join lobby, validate code
- [x] DTOs: JoinLobbyresponseDto, PlayerDto, PriorGameDto, GameItemDto
- [x] Request records: CreateLobbyRequest, JoinLobbyRequest
- [x] Minimal API endpoints Post/api/lobby, POST /api/lobby/join, GET /api/lobby/validate
- [x] DI registration
- [x] SignalR hub scaffold
- [x] Error handling on join endpoint (404 for missing lobby instead of 500)
#### Frontend
- [x] Vite + React + TypesScript setup
- [x] Vite proxy config
- [x] CSS reset (Josh Cmeau's reset)
- [x] Pixel-style design with CSS properties
- [x] Custom pixel fonts (Scrambled Eggs Bold, Simple Script, DyslexicPixel)
- [x] Color palette with Twilight 5 theme
- [x] Reusable components with CSS modules (Button, Card, Input)
- [x] Home page with three views (menu, create, join) using local state
- [x] Input validation and filtering
- [x] Disabled button state tied to input values
- [x] Error display for API failures
- [x] API integration (create lobby, join lobby)
- [x] App level screen switching (home to lobby)
- [x] Lobby page showing lobby codes and player list with host badge
- [x] Shared TypeScript types (Player, LobbyData)
- [x] Dyslexic font toggle class ready
### In Progress
- [ ] SignalR client connection: Connect from Lobby component when entering, join SignalR group by lobby code
- [ ] Real-time player join notification: Update player list when a new player joins via a SignalR PlayerJoined event
- [ ] Lobby Cleanup: detect when all players disconnect and clean up stale lobbies
### Planned 
#### Lobby Features
- [ ] SignalR OnDisconnectedAsync handling to track active connections per lobby
- [ ] Grace period before lobby is deleted
- [ ] Player disconnect/reconnect handling with automatic signalR reconnect
- [ ] "New Bracket" button for host
#### Game Creation (Pending Phase)
- [ ] Host enters a category name
- [ ] Host chooses bracket size
- [ ] API endpoints to create a new game in lobby
- [ ] GameService on backend
- [ ] Countdown timer before suggesting phase begins
- [ ] SignalR broadcast: game created, phase transition
#### Suggesting Phase
- [ ] Players Submit andidate items (these become GameItems when submitted with SubmittedByPlayerId)
- [ ] API endpoint for submitting items
- [ ] Check to be sure identical item does not exist
- [ ] Real time view to show the accepted items to avoid repeats
- [ ] Voting continues until the bracket number is reached
#### Seeding Phase
- [ ] Players rank their top N favorites (X = number of items, either N = X * 0.5 or N = X * 0.25)
- [ ] SeedVote submission endpoint
- [ ] Weighted scoring: SeedVote.Position to weighted points to GameItem.SeedScore
- [ ] Tally and assign GameItem.SeedRank
- [ ] SignalR broadcast: seeding complete, transition to bracket
#### Bracket Phase
- [ ] Generate rounds with matchups (1st seed vs last, 2nd seed vs second to last, etc)
- [ ] Matchup phase progression: Pending to preview to voting to results to complete
- [ ] Vote submission endpoint
- [ ] Real-time vote tallying
- [ ] Winner advancement to next round
- [ ] Bracket visualization UI
- [ ] SignalR broadcasts for each matchup phase transition
#### Results/Complete Phase
- [ ] Winner and losers saved to game entitty (in denormalized strings)
- [ ] Results are displayed on the screen
- [ ] Return to the lobby for the next game
- [ ] Prior games list in the lobby is updated
#### Polish / Accessibility
- [ ] Dyslexic-friendly font toggle
- [ ] Screen reader support / Accessible game design
- [ ] Mobile-responsive layout
- [ ] Load states and transition animations
- [ ] Sound effects?
- [ ] Favicon and page title updates
