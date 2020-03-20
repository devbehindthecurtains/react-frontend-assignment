import React from "react";
import { shallow } from "enzyme";
import {
  HistoryContainer,
  createTableHeader,
  reachedEnd
} from "./HistoryContainer";

describe("<HistoryContainer />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<HistoryContainer />);
  });

  describe("render()", () => {
    it("renders history table for users", () => {
      expect(
        wrapper.find({ "data-testid": "history-table-users" })
      ).toHaveLength(1);
    });
    it("renders history table for projects", () => {
      expect(
        wrapper.find({ "data-testid": "history-table-projects" })
      ).toHaveLength(1);
    });
  });
});

describe("HistoryContainer functions", () => {
  test("createTableHeader should create table header correctly", () => {
    const base = "My header";
    const total = 10;
    const rows = 3;
    const header = createTableHeader(base, total, rows);
    expect(header).toBe("My header (3/10)");
  });
  test("createTableHeader should create table header with different parameters", () => {
    const base = "My header";
    const header = createTableHeader(base, null, 3);
    expect(header).toBe(base);
    const newHeader = createTableHeader(base, 3, null);
    expect(newHeader).toBe(base);
  });
  test("createTableHeader should return empty header if base is not given", () => {
    const header = createTableHeader(null, 10, 3);
    expect(header).toBe("");
    const newHeader = createTableHeader("", 10, 3);
    expect(newHeader).toBe("");
  });
  test("reachedEnd should return true when all data is visible", () => {
    const end = reachedEnd(10, 10);
    expect(end).toBe(true);
    expect(reachedEnd("10", "10")).toBe(true);
  });
  test("reachedEnd should return false if any parameter is is not valid", () => {
    expect(reachedEnd(null, 10)).toBe(false);
    expect(reachedEnd("", 10)).toBe(false);
    expect(reachedEnd(undefined, 10)).toBe(false);
    expect(reachedEnd(10, null)).toBe(false);
    expect(reachedEnd(10, undefined)).toBe(false);
    expect(reachedEnd(10, "")).toBe(false);
  });
  test("reachedEnd should return false if end is not reached", () => {
    expect(reachedEnd(3, 10)).toBe(false);
    expect(reachedEnd(0, 10)).toBe(false);
    expect(reachedEnd(9, 10)).toBe(false);
  });
});
