import axios from "axios";
import { ErrorTypes } from "../../../src/common/middy/AppError.js";
axios.defaults.baseURL = `https://${process.env.httpApiGatewayEndpointId}.execute-api.${process.env.region}.amazonaws.com`;

describe("createField lambda", () => {
  it("Create new field, responds 200 OK", async () => {
    const payload = {
      location: "Test Location Integration Test",
      locationGM: "https://goo.gl/maps/5J4VymhaWm6upaLa8",
      photoURL: "https://s3.amazonaws.com/rails-camp-tutorials/blog/programming+memes/works-doesnt-work.jpg"
    }

    const actual = await axios.post("/fields", payload);
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
      await axios.post("/fields", payload);
    } catch (error) {
      actual = error.response.data;
    }

    expect(actual.statusCode).toBe(ErrorTypes.BAD_REQUEST.statusCode);
  })
})
