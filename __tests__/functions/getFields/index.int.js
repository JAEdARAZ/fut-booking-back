import axios from "axios";
axios.defaults.baseURL = `https://${process.env.httpApiGatewayEndpointId}.execute-api.${process.env.region}.amazonaws.com`;

describe("getFields lambda", () => {
  it("Get fields, responds 200 OK", async () => {
    const actual = await axios.get("/fields");
    expect(actual.status).toBe(200);
  })
})
