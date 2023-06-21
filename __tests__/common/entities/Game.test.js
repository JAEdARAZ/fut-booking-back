import { FieldNested } from "../../../src/common/entities/Field.js";
import Game, { GAME_ID } from "../../../src/common/entities/Game.js";

describe("Game entity", () => {
  it("Create new Game", () => {
    const params = {
      gameWeek: "24/2023",
      gameDateTime: "2023-06-14T15:30:00",
      playersTotal: 12,
      field: {
        id: "F1",
        location: "Test Location",
        locationGM: "https://goo.gl/maps/5J4VymhaWm6upaLa8",
        photoURL: "https://s3.amazonaws.com/rails-camp-tutorials/blog/programming+memes/works-doesnt-work.jpg"
      }
    }

    const actual = new Game(params);
    expect(actual.id).toBeTruthy();
    expect(actual.PK).toBe(GAME_ID + actual.id);
    expect(actual.SK).toBe(GAME_ID + actual.id);
    expect(actual.field).toBeInstanceOf(FieldNested);
    expect(actual.gameWeek).toBe(params.gameWeek);
    expect(actual.gameDateTime).toBe(params.gameDateTime);
    expect(actual.playersTotal).toBe(params.playersTotal);
  })

  it("Create Game object from item", () => {
    const params = {
      PK: "G#XX11CC22",
      SK: "G#XX11CC22",
      id: "XX11CC22",
      gameWeek: "24/2023",
      gameDateTime: "2023-06-14T15:30:00",
      playersTotal: 12,
      field: {
        id: "F1",
        location: "Test Location",
        locationGM: "https://goo.gl/maps/5J4VymhaWm6upaLa8",
        photoURL: "https://s3.amazonaws.com/rails-camp-tutorials/blog/programming+memes/works-doesnt-work.jpg"
      }
    }

    const actual = new Game(params);
    expect(actual.id).toBe(params.id);
    expect(actual.PK).toBe(params.PK);
    expect(actual.SK).toBe(params.SK);
    expect(actual.field).toBeInstanceOf(FieldNested);
    expect(actual.gameWeek).toBe(params.gameWeek);
    expect(actual.gameDateTime).toBe(params.gameDateTime);
    expect(actual.playersTotal).toBe(params.playersTotal);
  })
})