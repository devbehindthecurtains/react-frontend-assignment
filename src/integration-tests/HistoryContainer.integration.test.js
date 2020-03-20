import React from "react";
import { act } from "react-dom/test-utils";
import { createMount } from "@material-ui/core/test-utils";
import { HistoryContainer } from "./../components/history-container/HistoryContainer";
import api from "../lib/api";

jest.mock("../lib/api", () => {
  return {
    getProjectsDiff: () => {
      return {
        code: 667,
        data: [
          {
            id: "e28d290a-a2f2-48c2-9001-ff43884e271b",
            timestamp: new Date("2020/2/14").getTime(),
            diff: [{ field: "name", oldValue: "John", newValue: "Bruce" }]
          },
          {
            id: "8bd0166f-f0c6-48fd-9fcd-a17e76eb1e92",
            timestamp: new Date("2020/2/15").getTime(),
            diff: [{ field: "name", oldValue: "Bruce", newValue: "Nick" }]
          },
          {
            id: "0a75a2b3-be64-4aeb-ba4c-8ddb913791ac",
            timestamp: new Date("2020/2/16").getTime(),
            diff: [{ field: "name", oldValue: "Nick", newValue: "Michel" }]
          }
        ],
        limit: 3,
        offset: 3,
        total: 10
      };
    },
    getUsersDiff: () => {
      return {
        code: 667,
        data: [
          {
            id: "e28d290a-a2f2-48c2-9001-ff43884e271b",
            timestamp: new Date("2020/2/14").getTime(),
            diff: [{ field: "name", oldValue: "John", newValue: "Bruce" }]
          },
          {
            id: "8bd0166f-f0c6-48fd-9fcd-a17e76eb1e92",
            timestamp: new Date("2020/2/15").getTime(),
            diff: [{ field: "name", oldValue: "Bruce", newValue: "Nick" }]
          },
          {
            id: "0a75a2b3-be64-4aeb-ba4c-8ddb913791ac",
            timestamp: new Date("2020/2/16").getTime(),
            diff: [{ field: "name", oldValue: "Nick", newValue: "Michel" }]
          }
        ],
        limit: 3,
        offset: 3,
        total: 10
      };
    }
  };
});

describe("<HistoryContainer /> integration tests", () => {
  let mount;

  beforeAll(() => {
    mount = createMount();
  });

  afterAll(() => {
    mount.cleanUp();
  });

  it("Mounting should trigger getUserDiff and getProjectDiff from api", async () => {
    const getUsersDiff = jest.spyOn(api, "getUsersDiff");
    const getProjectsDiff = jest.spyOn(api, "getProjectsDiff");

    await act(async () => {
      mount(<HistoryContainer />);
    });

    expect(getUsersDiff).toHaveBeenCalledTimes(1);
    expect(getProjectsDiff).toHaveBeenCalledTimes(1);
    expect(getProjectsDiff().code).toBe(667);
  });
});
