import axios from "axios";
axios.defaults.baseURL = `https://${process.env.httpApiGatewayEndpointId}.execute-api.${process.env.region}.amazonaws.com`;

describe("createField lambda", () => {
  it("Create new field, responds 200 OK", async () => {
    const actual = await axios.get("/fields");
    expect(actual.status).toBe(200);
  })
})
