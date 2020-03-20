import { generateTableData } from "./actions";

const mockRows = [
  {
    id: "e28d290a-a2f2-48c2-9001-ff43884e271b",
    timestamp: 1582684581571,
    diff: [{ field: "name", oldValue: "John", newValue: "Bruce" }]
  },
  {
    id: "8bd0166f-f0c6-48fd-9fcd-a17e76eb1e92",
    timestamp: 1582490181571,
    diff: [{ field: "name", oldValue: "Bruce", newValue: "Nick" }]
  },
  {
    id: "0a75a2b3-be64-4aeb-ba4c-8ddb913791ac",
    timestamp: 1582230981571,
    diff: [{ field: "name", oldValue: "Nick", newValue: "Michel" }]
  }
];

describe("HistoryContainer actions", () => {
  test("generateTableData should create table data correctly ", () => {
    const tableRows = generateTableData(mockRows);
    expect(tableRows.length).toBe(3);
    const item = tableRows[0];
    const keys = Object.keys(item);
    expect(keys.length).toBe(4);

    expect(keys[0]).toBe("date");
    expect(keys[1]).toBe("id");
    expect(keys[2]).toBe("oldValue");
    expect(keys[3]).toBe("newValue");
  });
});
