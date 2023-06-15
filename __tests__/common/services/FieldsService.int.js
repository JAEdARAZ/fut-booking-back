import FieldsService from "../../../src/common/services/FieldsService";

describe("Fields service", () => {
  it("Create and get Field", async () => {
    const field = {
      location: "Test Location Fields Test",
      locationGM: "https://goo.gl/maps/5J4VymhaWm6upaLa8",
      photoURL: "https://s3.amazonaws.com/rails-camp-tutorials/blog/programming+memes/works-doesnt-work.jpg"
    }

    const service = new FieldsService();
    const createResult = await service.create(field);
    const getResult = await service.getField(createResult.id);

    expect(getResult.id).toBe(createResult.id);
    expect(getResult.location).toBe(createResult.location);
    expect(getResult.locationGM).toBe(createResult.locationGM);
    expect(getResult.photoURL).toBe(createResult.photoURL);
    await expect(service.deleteField(createResult.id)).resolves.not.toThrow();
  })

  it("Get fields", async () => {
    const service = new FieldsService();
    const getResults = await service.getFields();
    expect(Array.isArray(getResults)).toBeTruthy();
  })
})
