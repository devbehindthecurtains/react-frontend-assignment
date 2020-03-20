import React from "react";
import { shallow } from "enzyme";
import { App } from "./App";

describe("<App />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  describe("render()", () => {
    it("renders Container", () => {
      expect(wrapper.find({ "data-testid": "app-container" })).toHaveLength(1);
    });
    it("renders the Box", () => {
      expect(wrapper.find({ "data-testid": "app-box" })).toHaveLength(1);
    });
    it("renders the HistoryContainer", () => {
      expect(wrapper.find({ "data-testid": "history-container" })).toHaveLength(
        1
      );
    });
  });
});
