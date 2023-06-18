import Game, { GameField } from "../../../src/common/entities/Game.js";

describe("Game entity", () => {
  it("Create new Game", () => {
    const params = {
      gameWeek: "24/2023",
      gameDateTime: "2023-06-14T15:30:00",
      field: {
        id: "F1",
        location: "Test Location",
        locationGM: "https://goo.gl/maps/5J4VymhaWm6upaLa8",
        photoURL: "https://s3.amazonaws.com/rails-camp-tutorials/blog/programming+memes/works-doesnt-work.jpg"
      }
    }

    const actual = new Game(params);
    expect(actual.PK).toBeTruthy();
    expect(actual.SK).toBeTruthy();
    expect(actual.id).toBeTruthy();
    expect(actual.field).toBeInstanceOf(GameField);
    expect(actual.gameWeek).toBe(params.gameWeek);
    expect(actual.gameDateTime).toBe(params.gameDateTime);
    expect(actual.playersTotal).toBe(0);
  })
})
