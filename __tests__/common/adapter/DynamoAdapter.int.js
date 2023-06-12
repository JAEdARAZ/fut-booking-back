import DynamoAdapter from "../../../src/common/adapter/DynamoAdapter.js";

describe("DynamoDB Adapter", () => {
  const futBookingTableName = process.env.futBookingTableName;

  it("Query by PK", async () => {
    const db = new DynamoAdapter();
    const results = await db.queryByKey(futBookingTableName, "TEST-QUERY-PK");
    expect(Array.isArray(results.Items)).toBeTruthy();
    expect(results.Count).toBe(0);
  });

  it("Get item by Key", async () => {
    const db = new DynamoAdapter();
    const result = await db.getByKey(futBookingTableName, "TEST-PK", "TEST-SK");
    expect(result.ConsumedCapacity.TableName).toBe(futBookingTableName);
  });

  it("Create, get and delete item", async () => {
    const db = new DynamoAdapter();
    const PK = "TEST-PK";
    const SK = "TEST-SK";
    const objectCreate = { PK, SK };

    const createResult = await db.createItem(futBookingTableName, objectCreate);
    const getResult = await db.getByKey(futBookingTableName, PK, SK);
    const deleteResult = await db.deleteItem(futBookingTableName, PK, SK);
    const check = await db.getByKey(futBookingTableName, PK, SK);

    expect(createResult.ConsumedCapacity.TableName).toBe(futBookingTableName);
    expect(deleteResult.ConsumedCapacity.TableName).toBe(futBookingTableName);
    expect(getResult.Item.PK).toBe(PK);
    expect(getResult.Item.SK).toBe(SK);
    expect(check.Item).toBe(undefined);
  });
})