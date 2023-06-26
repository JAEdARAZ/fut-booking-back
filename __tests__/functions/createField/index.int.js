import { apiAxios } from "../../../config/integration.jest.config.js";
import DynamoAdapter from "../../../src/common/adapter/DynamoAdapter.js";
import { FIELD_ID, FIELD_PK } from "../../../src/common/entities/Field.js";
import { ErrorTypes } from "../../../src/common/middy/AppError.js";

describe("createField lambda", () => {
  let createdFieldId;

  it("Create new field, responds 200 OK", async () => {
    const payload = {
      location: "Test Location Integration Test",
      locationGM: "https://goo.gl/maps/5J4VymhaWm6upaLa8",
      photoURL: "https://s3.amazonaws.com/rails-camp-tutorials/blog/programming+memes/works-doesnt-work.jpg"
    }

    const actual = await apiAxios.post("/fields", payload);
    createdFieldId = actual.data.id;

    expect(actual.data.id).toMatch(new RegExp(/^[a-z0-9]{32}$/));
    expect(actual.data.location).toBe(payload.location);
    expect(actual.data.locationGM).toBe(payload.locationGM);
    expect(actual.data.photoURL).toBe(payload.photoURL);
    expect(actual.status).toBe(200);
  })

  it("Invalid input", async () => {
    const payload = {
      location: "Test Location Integration Test",
      locationGM: "https://goo.gl/maps/5J4VymhaWm6upaLa8",
      photoURL: "https://s3.amazonaws.com/rails-camp-tutorials/blog/programming+memes/works-doesnt-work.jpg",
      extraUnnecessaryField: ""
    }

    let actual;
    try {
      await apiAxios.post("/fields", payload);
    } catch (error) {
      actual = error.response.data;
    }

    expect(actual.statusCode).toBe(ErrorTypes.BAD_REQUEST.statusCode);
  })

  afterAll(async () => {
    const db = new DynamoAdapter();
    await db.deleteItem(process.env.futBookingTableName, FIELD_PK, FIELD_ID + createdFieldId);
  })
})
