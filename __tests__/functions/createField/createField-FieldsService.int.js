import FieldsService from "../../../src/common/services/FieldsService.js";

describe("Create field integration test", () => {
  it("Create new field", async () => {
    const field = {
      location: "Test Location",
      locationGM: "https://goo.gl/maps/5J4VymhaWm6upaLa8",
      photoURL: "https://s3.amazonaws.com/rails-camp-tutorials/blog/programming+memes/works-doesnt-work.jpg"
    }

    const service = new FieldsService();
    const actual = await service.create(field);
    expect(actual).toBeTruthy();
  })
})