import { FIELD_ID, FieldNested } from "../../../src/common/entities/Field.js"
import { GAME_ID } from "../../../src/common/entities/Game.js"
import GamePlayer from "../../../src/common/entities/GamePlayer.js"
import { PLAYER_ID, PlayerNested } from "../../../src/common/entities/Player.js"
import { simplifyResponse } from "../../../src/functions/getPlayerGames/index.js"


describe("Get Player Games business logic", () => {
  const playerGame1 = new GamePlayer({
    PK: GAME_ID + "123",
    SK: PLAYER_ID + "XXX",
    field: new FieldNested({
      id: FIELD_ID + "F1",
      location: "testLocation",
      locationGM: "testLocationGM",
      photoURL: "testPhotoURL"
    }),
    gameDateTime: "2020-04-04T09:00:00",
    player: new PlayerNested({
      id: PLAYER_ID + "XXX",
      name: "Jane Doe",
      birthdate: "10/10/2010",
      email: "test@mail.com",
      gender: "F"
    })
  });

  const playerGame2 = new GamePlayer({
    PK: GAME_ID + "456",
    SK: PLAYER_ID + "XXX",
    field: new FieldNested({
      id: FIELD_ID + "F1",
      location: "testLocation",
      locationGM: "testLocationGM",
      photoURL: "testPhotoURL"
    }),
    gameDateTime: "2020-04-04T11:00:00",
    player: new PlayerNested({
      id: PLAYER_ID + "XXX",
      name: "Jane Doe",
      birthdate: "10/10/2010",
      email: "test@mail.com",
      gender: "F"
    })
  });

  it("Simplify response", () => {
    const playerGames = [playerGame1, playerGame2];
    const simplifiedGames = simplifyResponse(playerGames);
    console.log(simplifiedGames);

    expect(simplifiedGames).toHaveLength(2);
    expect(simplifiedGames[0].playerId).toBe("XXX");
    expect(simplifiedGames[1].playerId).toBe("XXX");
    expect(simplifiedGames[0].gameId).toBe("123");
    expect(simplifiedGames[1].gameId).toBe("456");
    expect(simplifiedGames[0].player).toBeUndefined();
    expect(simplifiedGames[1].player).toBeUndefined();
  })
})