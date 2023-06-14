import axios from "axios";
axios.defaults.baseURL = `https://${process.env.httpApiGatewayEndpointId}.execute-api.${process.env.region}.amazonaws.com`;

describe("getGames lambda", () => {
  it("Get games, responds 200 OK", async () => {
    const actual = await axios.get("/games");
    expect(actual.status).toBe(200);
  })
})
