import Field, { FIELD_PK } from "../../../src/common/entities/Field.js"

describe("Field entity", () => {
  it("Create new Field", () => {
    const params = {
      location: "Test Location",
      locationGM: "https://goo.gl/maps/5J4VymhaWm6upaLa8",
      photoURL: "https://s3.amazonaws.com/rails-camp-tutorials/blog/programming+memes/works-doesnt-work.jpg"
    }

    const actual = new Field(params);
    expect(actual.PK).toBe(FIELD_PK);
    expect(actual.SK).toBeTruthy();
    expect(actual.id).toBeTruthy();
    expect(actual.location).toBe(params.location);
    expect(actual.locationGM).toBe(params.locationGM);
    expect(actual.photoURL).toBe(params.photoURL);
  })

  it("Create Field object from item", () => {
    const params = {
      PK: "F#FIELD",
      SK: "F#123456",
      id: "123456",
      location: "Test Location",
      locationGM: "https://goo.gl/maps/5J4VymhaWm6upaLa8",
      photoURL: "https://s3.amazonaws.com/rails-camp-tutorials/blog/programming+memes/works-doesnt-work.jpg"
    }

    const actual = new Field(params);
    expect(actual.id).toBe(params.id);
    expect(actual.PK).toBe(params.PK);
    expect(actual.SK).toBe(params.SK);
    expect(actual.location).toBe(params.location);
    expect(actual.locationGM).toBe(params.locationGM);
    expect(actual.photoURL).toBe(params.photoURL);
  })
})
