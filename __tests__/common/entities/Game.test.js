import Field from "../../../src/common/entities/Field.js";
import Game from "../../../src/common/entities/Game.js"

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
    expect(actual.field).toBeInstanceOf(Field);
    expect(actual.gameWeek).toBe(params.gameWeek);
    expect(actual.gameDateTime).toBe(params.gameDateTime);
    expect(actual.playersTotal).toBe(0);
  })

  it("Create Game with id", () => {
    const params = {
      id: "11223344",
      gameWeek: "24/2023",
      gameDateTime: "2023-06-14T15:30:00",
      playersTotal: 0,
      field: {
        id: "F1",
        location: "Test Location",
        locationGM: "https://goo.gl/maps/5J4VymhaWm6upaLa8",
        photoURL: "https://s3.amazonaws.com/rails-camp-tutorials/blog/programming+memes/works-doesnt-work.jpg"
      }
    }

    const actual = new Game(params);
    expect(actual.PK).toBe(undefined);
    expect(actual.SK).toBe(undefined);
    expect(actual.id).toBe(params.id);
    expect(actual.field).toBeInstanceOf(Field);
    expect(actual.gameWeek).toBe(params.gameWeek);
    expect(actual.gameDateTime).toBe(params.gameDateTime);
    expect(actual.playersTotal).toBe(params.playersTotal);
  })

  it("Remove PKSK", () => {
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
    actual.removePKSK();
    expect(actual.PK).toBe(undefined);
    expect(actual.SK).toBe(undefined);
  })
})
