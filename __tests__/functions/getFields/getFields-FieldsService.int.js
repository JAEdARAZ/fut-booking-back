import FieldsService from "../../../src/common/services/FieldsService.js";

describe("Get fields integration test", () => {
  it("Get fields", async () => {
    const service = new FieldsService();
    const actual = await service.getFields();
    expect(Array.isArray(actual)).toBeTruthy();
  })
})