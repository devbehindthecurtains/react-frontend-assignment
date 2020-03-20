import { formatter } from "./formatter";

/*
 ** timestamp: 1582230981571, // Feb 20 2020
 */

describe("Formatter", () => {
  test("should format given timestamp to yyyy-MM-dd format ", () => {
    const date = formatter.toLocalizedDate(1582230981571);
    expect(date).toBe("2020-02-20");
  });
  test("should handle invalid values ", () => {
    const date = formatter.toLocalizedDate("cat");
    expect(date).toBe("");
    expect(formatter.toLocalizedDate(null)).toBe("");
    expect(formatter.toLocalizedDate(undefined)).toBe("");
    expect(formatter.toLocalizedDate("")).toBe("");
  });
});
