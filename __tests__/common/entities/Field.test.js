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
    expect(actual.fieldId).toBeTruthy();
    expect(actual.location).toBe(params.location);
    expect(actual.locationGM).toBe(params.locationGM);
    expect(actual.photoURL).toBe(params.photoURL);
  })

  it("Create Field from fieldId", () => {
    const params = {
      fieldId: "11223344",
      location: "Test Location",
      locationGM: "https://goo.gl/maps/5J4VymhaWm6upaLa8",
      photoURL: "https://s3.amazonaws.com/rails-camp-tutorials/blog/programming+memes/works-doesnt-work.jpg"
    }

    const actual = new Field(params);
    expect(actual.PK).toBe(undefined);
    expect(actual.SK).toBe(undefined);
    expect(actual.fieldId).toBe(params.fieldId);
    expect(actual.location).toBe(params.location);
    expect(actual.locationGM).toBe(params.locationGM);
    expect(actual.photoURL).toBe(params.photoURL);
  })
})
