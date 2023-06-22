export function simplifyResponse(playerGames) {
  playerGames.map(playerGame => {
    delete playerGame.player;
    playerGame.getSimplifiedObject();
  });

  return playerGames;
}