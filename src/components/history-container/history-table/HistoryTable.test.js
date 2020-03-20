import React from "react";
import { shallow } from "enzyme";
import { HistoryTable } from "./HistoryTable";

const rows = [
  { date: "2020-02-02", id: "1", oldValue: "cat", newValue: "dog" },
  { date: "2020-02-04", id: "2", oldValue: "cat", newValue: "dog" },
  { date: "2020-02-06", id: "3", oldValue: "cat", newValue: "dog" }
];

describe("<HistoryTable />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<HistoryTable state={{ tableRows: rows }} />);
  });

  describe("render()", () => {
    it("renders Header typography", () => {
      expect(
        wrapper.find({ "data-testid": "history-table-header" })
      ).toHaveLength(1);
    });
    it("renders Paper", () => {
      expect(
        wrapper.find({ "data-testid": "history-table-paper" })
      ).toHaveLength(1);
    });
    it("renders Table", () => {
      expect(
        wrapper.find({ "data-testid": "history-table-table" })
      ).toHaveLength(1);
    });
    it("renders TableHead", () => {
      expect(
        wrapper.find({ "data-testid": "history-table-tableHead" })
      ).toHaveLength(1);
    });
    it("renders Header TableRow", () => {
      expect(
        wrapper.find({ "data-testid": "history-table-tableRow" })
      ).toHaveLength(1);
    });
    it("renders Header TableCell", () => {
      expect(
        wrapper.find({ "data-testid": "history-table-header-tableCell" })
      ).toHaveLength(4);
    });
    it("renders Header SortLabel", () => {
      expect(
        wrapper.find({
          "data-testid": "history-table-header-tableCell-sortLabel"
        })
      ).toHaveLength(1);
    });
    it("renders Header SortLabel Typography", () => {
      expect(
        wrapper.find({ "data-testid": "history-table-sortLabel-typography" })
      ).toHaveLength(1);
    });
    it("renders Header normal cell Typography", () => {
      expect(
        wrapper.find({
          "data-testid": "history-table-header-normal-typography"
        })
      ).toHaveLength(3);
    });
    it("renders body TableBody", () => {
      expect(
        wrapper.find({
          "data-testid": "history-table-body"
        })
      ).toHaveLength(1);
    });
    it("renders body TableCells", () => {
      expect(
        wrapper.find({
          "data-testid": "history-table-body-cell"
        })
      ).toHaveLength(12);
    });
    it("not render Skeleton ", () => {
      expect(
        wrapper.find({
          "data-testid": "history-table-skeleton"
        })
      ).toHaveLength(0);
    });
    it("not rendering error ", () => {
      expect(
        wrapper.find({
          "data-testid": "history-table-error"
        })
      ).toHaveLength(0);
    });
    it("not rendering reached end message ", () => {
      expect(
        wrapper.find({
          "data-testid": "history-table-no-more-message"
        })
      ).toHaveLength(0);
    });
    it("Renders load more Button", () => {
      expect(
        wrapper.find({
          "data-testid": "history-table-load-more-button"
        })
      ).toHaveLength(1);
    });
  });
});
